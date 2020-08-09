import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [UserService]
})
export class CartComponent implements OnInit {

  public user: User;
  public url: string;
  constructor(
    private _userService: UserService
  ) { 
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.getUser("5f2f42f7a992ed52cc6634ff");
}

getUser(userID: string) {
  this._userService.getUser(userID).subscribe(
    response => {
      this.user = response.user;
    },
    error => {
      console.log(error);
    }
  );
}

  onSubmit(form){
    
  }
}
