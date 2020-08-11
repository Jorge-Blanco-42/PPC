import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Global } from 'src/app/services/global';
import { User } from '../../models/user';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  providers: [UserService, OrderService]
})
export class HistoryComponent implements OnInit {
  public orders: Array<Order>;
  public user: User;
  public order: Order;
  constructor(
    private _userService: UserService,
    private _orderService: OrderService,
    private router: Router,
    private _cookieService: CookieService
  ) {
    this.user = new User("", "", "", "", "", "", []);
    this.order = new Order("", "", new Date(), "", []);
  }

  ngOnInit(): void {
    this.user = JSON.parse(this._cookieService.get("user"));
    if (!this.user) {
      this.router.navigate(['/logIn']);
    }else{
      console.log("ak7");
    }
  }

}
