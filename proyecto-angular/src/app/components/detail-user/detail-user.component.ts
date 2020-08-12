import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserLog } from '../../services/authservice.service';  
import { UserService } from '../../services/user.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';  
import { SHA256, enc } from "crypto-js";

@Component({
  selector: 'detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css'],
  providers: [UserService, UploadService]
})
export class DetailUserComponent implements OnInit {
  public title: string;
  public user: User;
  public ogUser: User;
  public status: boolean;
  public sent: boolean;
  public url: string;
  public encript : String;
  constructor(
    private _userService: UserService,
    private cookieService: CookieService,
    private _uploadService: UploadService,
    private _router: Router
  ) { 
    this.title = 'Editar usuario';
    this.sent = false;
    this.url = Global.url;
    this.encript = "";
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.user = JSON.parse(this.cookieService.get("user"));
    this.ogUser = this.user;
  }

  onSubmit(form) {
    this.sent = true;
    if((<HTMLInputElement>document.getElementById("password")).value == ""){
      this.user.password = this.ogUser.password;
    } else{
      this.encript = SHA256(this.user.password).toString(enc.Hex);
      this.user.password = this.encript;
    }

    this._userService.updateUser(this.user).subscribe(
      response => {
        if (response.userUpdated) {
          this.status = true;
        } else {
          this._userService.updateUser(this.ogUser);
          this.status = false;
        }
      },
      error => {
        this.status = false;
        console.log(error);
      }
    );

    this.cookieService.set("user", JSON.stringify(this.user)); 

    alert("¡Datos actualizados!");
    this._router.navigate(['/productos']); 

  }


}
