import { Component, OnInit } from '@angular/core';
import { AuthService, UserLog } from '../../services/authservice.service';  
import { Router, ActivatedRoute } from '@angular/router';  
import { CookieService } from 'ngx-cookie-service';  

@Component({
  selector: 'dashTest',
  templateUrl: './dashTest.component.html',
  styleUrls: ['./dashTest.component.css']
})
export class DashTestComponent implements OnInit {

    userLog : UserLog;  
    [x: string]: any;  
    userDisplayName = '';  
    password = '';  
    constructor(private srvLogin: AuthService, private router: Router, public activatedRoute: ActivatedRoute, private cookieService: CookieService) {  
        this.userLog = new UserLog();  
        this.userDisplayName = this.cookieService.get('username');  
        this.password = this.cookieService.get('password');  
        this.userLog.username = this.userDisplayName;  
        this.userLog.password = this.password;  
        if (!srvLogin.checkLogValues(this.userLog)) {  
            router.navigate(['/logIn']);  
        }  
    }  
    ngOnInit(): void {}  
    logout(): void {  
        this.router.navigate(['/logIn']);  
        this.cookieService.deleteAll();  
    }  
}
