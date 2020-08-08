import { Component, ViewEncapsulation, ViewChild, ElementRef, SecurityContext, OnInit } from '@angular/core';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { SafePipe } from '../../pipes/Safe.pipe';


@Component({
  selector: 'signUp',
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.css'],
})
export class SignUpComponent implements OnInit {

  constructor(){ 

  }

  ngOnInit(): void {

  }

  onSubmit(form) {

  }


}