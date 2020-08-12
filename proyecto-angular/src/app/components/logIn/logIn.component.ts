import { Component, ViewEncapsulation, ViewChild, ElementRef, SecurityContext, OnInit } from '@angular/core';
import { Global } from '../../services/global';
import { AuthService, UserLog } from '../../services/authservice.service';  
import { User } from '../../models/user';
import { CookieService } from 'ngx-cookie-service';  
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UploadService } from '../../services/upload.service';
import { SafePipe } from '../../pipes/Safe.pipe';
import { SHA256, enc } from "crypto-js";

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
    let encript = SHA256(this.userLog.password).toString(enc.Hex);
    this.user.password = encript;
    this._userService.getUser(this.userLog.username,encript).subscribe(
      response => {
        if (response.user) {  
          this.srvLogin.isloggedin = true;  
          console.log(this.srvLogin.isloggedin); 
          this.user = response.user;
          this.cookieService.set("user", JSON.stringify(this.user)); 
          this.router.navigate(['/dashboard']); 
      } 
        
      },
      error => {
        console.log(error);
      }
    ) ;
    
  }

}