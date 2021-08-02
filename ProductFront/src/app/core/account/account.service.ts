import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, throwError } from "rxjs";
import { IAuthAccount, IAuthResponse, IRegAccount } from "../interfaces/accounts-interfaces";
import { tap, catchError } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class AccountService {

    public error$: Subject<string> = new Subject<string>();
    public pathBase: string = "https://litretherproductwebapi.azurewebsites.net/api/account";
    constructor(private http: HttpClient) { }

    get token(): string | null {
        const expiresDate = new Date(String(localStorage.getItem('fb-token-exp')));
        if(new Date() > expiresDate){
            this.logout();
            return null;
        }
        console.log(localStorage.getItem('fb-token'));
        return localStorage.getItem('fb-token-exp');
    }

    login(authAccount: IAuthAccount): Observable<any>{
        return this.http.post(`${this.pathBase}/login`, authAccount)
        .pipe(
            tap((response: any) => this.setToken(response)),
            catchError(this.handleError.bind(this))
        );
    }

    registration(regAccount: IRegAccount): Observable<any>{
        return this.http.post(`${this.pathBase}`, regAccount)
        .pipe(
            tap((response: any) => this.setToken(response)),
            catchError(this.handleError.bind(this))
        );
    }

    logout(){
        this.setToken(null);
    }

    isAuthenticated(): boolean{
        return !!this.token;
    }

    handleError(error: HttpErrorResponse){
        const {message} = error.error.error;

        switch (message) {
            case 'INVALID_USERNAME':
                this.error$.next('Wrong username');
                break;
            case 'INVALID_PASSWORD':
                this.error$.next('Wrong password');
                break;
            case 'EMAIL_NOT_FOUND':
                this.error$.next('Nonexistent email');
                break;
            default:
                this.error$.next('ok');
        }
        
        return throwError(error);                                   
    }
    
    private setToken(response: IAuthResponse | null){
        if(response){
            const expiresDate = new Date(new Date().getTime() + 60*60*1000);
            localStorage.setItem('fb-token', response.token);
            localStorage.setItem('fb-token-exp', expiresDate.toString());
        } else {
            localStorage.clear();
        }
    }
}