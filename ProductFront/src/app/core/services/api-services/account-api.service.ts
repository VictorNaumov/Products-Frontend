import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IAuthAccount, IRegAccount } from "../../interfaces/accounts-interfaces";

@Injectable({providedIn: 'root'})
export class AccountApiService {
    public pathBase: string = "https://litretherproductwebapi.azurewebsites.net/api/account";

    constructor(private http: HttpClient) {
    }

    public CreateAccount(accountReg: IRegAccount):Observable<Response> {
        return this.http.post<Response>(`${this.pathBase}`, accountReg);
    }

    public DeleteAccount(accountAuth: IAuthAccount):Observable<Response> {
        return this.http.delete<Response>(`${this.pathBase}/delete`, { body: accountAuth });
    }
}