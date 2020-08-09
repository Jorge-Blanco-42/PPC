import { Component, ViewEncapsulation, ViewChild, ElementRef, SecurityContext, OnInit } from '@angular/core';
import { Global } from '../../services/global';
import { User } from '../../models/user';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UploadService } from '../../services/upload.service';
import { SafePipe } from '../../pipes/Safe.pipe';


@Component({
  selector: 'signUp',
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.css'],
  providers: [UploadService]
})
export class SignUpComponent implements OnInit {
  public user: User;
  public status: boolean;
  public sent: boolean;
  public saved_user: User;
  public url: string;
  constructor(private _uploadService: UploadService){ 
    this.user = new User('','','','','','cliente',[]);
    this.sent = false;
    this.url = Global.url;
  }

  ngOnInit(): void {

  }

  onSubmit(form){

  }

}