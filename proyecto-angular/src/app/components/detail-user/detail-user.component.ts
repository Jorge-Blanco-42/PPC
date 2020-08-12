import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserLog } from '../../services/authservice.service';  
import { UserService } from '../../services/user.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { error } from 'protractor';
import { CookieService } from 'ngx-cookie-service';  

@Component({
  selector: 'detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css'],
  providers: [UserService, UploadService]
})
export class DetailUserComponent implements OnInit {
  public title: string;
  public user: User;
  public userLog : UserLog;
  public ogUser: User;
  public status: boolean;
  public sent: boolean;
  public filesToUpload: Array<File>;
  public saved_product: User;
  public url: string;
  constructor(
    private _userService: UserService,
    private cookieService: CookieService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    this.title = 'Editar usuario';
    this.sent = false;
    this.url = Global.url;
  }

  ngOnInit(): void {
      this.getUser();
  }

  getUser() {
    this.user = JSON.parse(this.cookieService.get("user"));
  }

  onSubmit(form) {
    this.sent = true;
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
  }


}
