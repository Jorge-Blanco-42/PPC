import { Component, ViewEncapsulation, ViewChild, ElementRef, SecurityContext, OnInit } from '@angular/core';
import { Global } from '../../services/global';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UploadService } from '../../services/upload.service';
import { SafePipe } from '../../pipes/Safe.pipe';


@Component({
  selector: 'signUp',
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.css'],
  providers: [UserService, UploadService]
})
export class SignUpComponent implements OnInit {
  public user: User;
  public status: boolean;
  public sent: boolean;
  public saved_user: User;
  public url: string;
  constructor(
    private _userService: UserService,
    private _uploadService: UploadService
  ){ 
    this.user = new User('','','','','','cliente',[]);
    this.sent = false;
    this.url = Global.url;
  }

  ngOnInit(): void {

  }

  onSubmit(form){
    this.sent = true;
    this._userService.saveUser(this.user).subscribe(
      response =>{
        if(response.user){          
          this.status = true;
          this.saved_user = response.user;
          form.reset();
        }else{
          this.status = false;
        }
        console.log(response);
      },
      error => {
        console.log(error);
      }

    );
  }

  getUser() {
    this._userService.getUserByID("5f2f4d1c7f6f5c6160bd0b41").subscribe(
      response => {
        this.user = response.user;
      },
      error => {
        console.log(error);
      }
    );
  }

}