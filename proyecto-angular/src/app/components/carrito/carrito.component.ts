import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { PaymentMethodService } from '../../services/paymentMethod.service';
import { Global } from 'src/app/services/global';
import { PaymentMethod } from '../../models/paymentMethod';
import { Restaurant } from '../../models/restaurant';
import { RestaurantService } from '../../services/restaurant.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  providers: [UserService, PaymentMethodService]
})
export class CarritoComponent implements OnInit {

  public user: User;
  public payments: Array<PaymentMethod>;
  public payment: PaymentMethod;
  public url: string;
  public logo: string;
  public enviado: boolean;
  constructor(
    private _userService: UserService,
    private _paymentMethodService: PaymentMethodService,
    private _restaurantService: RestaurantService,
    private _cookieService: CookieService
  ) {
    this.url = Global.url;
    this.user = new User("", "", "", "", "", "", []);
    this.payment = new PaymentMethod("", false);
    this.enviado = false;
  }

  ngOnInit(): void {
    this.getPayments();
    this.getUser("5f2f42f7a992ed52cc6634ff");
    this.getRestaurant();
  }

  getUser(userID: string) {
    this._userService.getUserByID(userID).subscribe(
      response => {
        console.log(response);
        this.user = response.user;
      },
      error => {
        console.log(error);
      }
    );
  }

  getRestaurant() {
    this._restaurantService.getRestaurant("5f2d75dccf9f4e41dcfe03ca").subscribe(
      response => {
        this.logo = response.restaurant.cartLogo;
      },
      error => {
        console.log(error);
      }
    );
  }
  getPayments() {
    this._paymentMethodService.getPayments().subscribe(
      response => {
        if (response.payments) {
          this.payments = response.payments;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  onSubmit(form) {
    this.enviado = true;
  }
}
