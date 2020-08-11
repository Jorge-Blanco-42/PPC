import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { CookieService } from 'ngx-cookie-service';  
@Injectable({  
    providedIn: 'root'  
})  
export class AuthService {  
    public username = 'mary@mary.com';  
    public password = 'mary';  
    isloggedin = false;  
    constructor(private http: HttpClient) {}  
    checkLogValues(value: UserLog): boolean {  
        if (this.username === value.username && this.password === value.password) {  
            console.log(this.username);  
            console.log(this.password);  
            alert('Login valid');  
            return true;  
        } else {  
            alert('please enter valid data');  
            return false;  
        }  
    }  
}  
export class UserLog {  
    username: string;  
    password: string;  
}  