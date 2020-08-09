import { Component, ViewEncapsulation, ViewChild, ElementRef, SecurityContext, OnInit } from '@angular/core';
import { Global } from '../../services/global';
import { User } from '../../models/user';
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
  constructor(

  ){ 
    this.user = new User('','','','','','cliente',[]);
  }

  ngOnInit(): void {

  }

  onSubmit(form){

  }


}