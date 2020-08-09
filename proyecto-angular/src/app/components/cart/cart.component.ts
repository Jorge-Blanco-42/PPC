import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { PaymentMethodService } from '../../services/paymentMethod.service';
import { Global } from 'src/app/services/global';
import { PaymentMethod } from '../../models/paymentMethod';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [UserService, PaymentMethodService]
})
export class CartComponent implements OnInit {

  public user: User;
  public payments: Array<PaymentMethod>;
  public url: string;
  constructor(
    private _userService: UserService,
    private _paymentMethodService: PaymentMethodService
  ) { 
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.getUser("5f2f42f7a992ed52cc6634ff");
}

getPayments(){
  this._paymentMethodService.getPayments().subscribe(
    response =>{
      if(response.projects){
        this.payments = response.payments;
      }
    },
    error =>{
      console.log(error);
    }
  );
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
