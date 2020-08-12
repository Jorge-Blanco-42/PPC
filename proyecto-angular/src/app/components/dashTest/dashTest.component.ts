import { Component, OnInit } from '@angular/core';
import { AuthService, UserLog } from '../../services/authservice.service';  
import { Router, ActivatedRoute } from '@angular/router';  
import { CookieService } from 'ngx-cookie-service';  
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'dashTest',
  templateUrl: './dashTest.component.html',
  styleUrls: ['./dashTest.component.css'],
  providers: [UserService]
})
export class DashTestComponent implements OnInit {

    userLog : UserLog;  
    [x: string]: any;  
    userDisplayName = '';  
    password = ''; 
    public user: User; 
    constructor(private srvLogin: AuthService, private router: Router, public activatedRoute: ActivatedRoute, private cookieService: CookieService, private _userService: UserService) {  
        this.userLog = new UserLog();  
        this.user =JSON.parse(this.cookieService.get("user"));
        if (!this.user) {  
            router.navigate(['/logIn']);  
        }  
    }  
    ngOnInit(): void {}  
    logout(): void {  
        this.router.navigate(['/logIn']);  
        this.cookieService.deleteAll();  
    }  
}
