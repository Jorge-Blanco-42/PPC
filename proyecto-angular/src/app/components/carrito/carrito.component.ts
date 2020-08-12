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
import { Product } from 'src/app/models/product';
import { deepEqual, deepStrictEqual } from 'assert';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  providers: [UserService, PaymentMethodService, OrderService]
})
export class CarritoComponent implements OnInit {

  public user: User;
  public order: Order;
  public orderNumber: number;
  public payments: Array<PaymentMethod>;
  public payment: PaymentMethod;
  public pay: string;
  public url: string;
  public logo: string;
  public enviado: boolean;
  public carrito: Array<Product>;
  public suma: number;
  public envio: number;
  public total: number;
  
  constructor(
    private _orderService: OrderService,
    private _userService: UserService,
    private _paymentMethodService: PaymentMethodService,
    private _restaurantService: RestaurantService,
    private _cookieService: CookieService
  ) {
    this.url = Global.url;
    this.user = new User("", "", "", "", "", "", []);
    this.payment = new PaymentMethod("", false);
    this.enviado = false;
    this.suma = 0;
    this.envio = 1600;
    this.pay = "";
  }
  
  ngOnInit(): void {
    this.getPayments();
    this.getOrders();
    let usuario = JSON.parse(this._cookieService.get("user"));
    if(usuario){
      this.user = usuario;
    }
    this.getRestaurant();
    this.carrito = JSON.parse(localStorage.getItem("carrito"));
    for (let i = 0; i < this.carrito.length; i++) {
      if (this.carrito[i].price) {
        let number: number = +this.carrito[i].price;
        this.suma += number;
      }
    }
    this.total = this.suma + this.envio
  }

  getOrders() {
    
    this._orderService.getOrders().subscribe(
      response => {
        
        if (response.orders) {
          this.orderNumber = response.orders.length;
          console.log(this.orderNumber);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getUser(userID: string) {
    this._userService.getUserByID(userID).subscribe(
      response => {
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
    this.order.number = (this.orderNumber+1).toString();
    this.order.payment = "";
    this.enviado = true;
  }
  removeProduct(product) {
    const index = this.carrito.indexOf(product, 0);
    if (index > -1) {
      this.carrito.splice(index, 1);
    }
  }
}
