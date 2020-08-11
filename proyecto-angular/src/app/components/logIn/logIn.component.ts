import { Component, ViewEncapsulation, ViewChild, ElementRef, SecurityContext, OnInit } from '@angular/core';
import { Global } from '../../services/global';
import { AuthService, UserLog } from '../../services/authservice.service';  
import { User } from '../../models/user';
import { CookieService } from 'ngx-cookie-service';  
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UploadService } from '../../services/upload.service';
import { SafePipe } from '../../pipes/Safe.pipe';


@Component({
  selector: 'LogIn',
  templateUrl: './LogIn.component.html',
  styleUrls: ['./LogIn.component.css'],
  providers: [UserService]
})
export class LogInComponent implements OnInit {
    public user : User;
    public userLog : UserLog;
  constructor(
    private srvLogin: AuthService, 
    private router: Router, 
    public activatedRoute: ActivatedRoute, 
    private cookieService: CookieService,
    private _userService: UserService
  ){ 
    this.user = new User('','','','','','cliente',[]);
    this.userLog =new UserLog(); //este es Obj 
  }

  ngOnInit(): void {

  }

  onSubmit(form){
    //this.srvLogin.user =al user de la base
    //this.srvLogin.password =al user de la base
    this.cookieService.set('username', this.userLog.username);  
    this.cookieService.set('password', this.userLog.password);  
    console.log(this.cookieService.get('username'));  
    console.log(this.cookieService.get('password'));  
    const a = this.userLog;  
    if (this.srvLogin.checkLogValues(this.userLog)) {  
        this.srvLogin.isloggedin = true;  
        console.log(this.srvLogin.isloggedin);  
        this.router.navigate(['/dashboard']);  
    } 
  }

  getUser() {
    this._userService.getUser("5f2f4d1c7f6f5c6160bd0b41").subscribe(
      response => {
        this.user = response.user;
      },
      error => {
        console.log(error);
      }
    );
  }

}