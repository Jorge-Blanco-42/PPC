import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Global } from 'src/app/services/global';
import { User } from '../../models/user';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ReportComponent } from '../report/report.component';

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

  animal: string;
  name: string;

  constructor(
    private _userService: UserService,
    private _orderService: OrderService,
    private router: Router,
    private _cookieService: CookieService,
    public dialog: MatDialog
  ) {
    this.user = new User("", "", "", "", "", "", []);
    this.order = new Order("", "", new Date(), "","", []);
    this.orders = [];
  }

  openDialog(order): void {
    const dialogRef = this.dialog.open(ReportComponent, {
      width: '50%',
      data: {order: order}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit(): void {
    this.user = JSON.parse(this._cookieService.get("user"));
    if (this.user) {      
      this._userService.getUser(this.user.email.valueOf(),this.user.password.valueOf()).subscribe(
        response => {
          if (response.user) {
            this.user.orders = response.user.orders;
            for (let index = 0; index < response.user.orders.length; index++) {
              let element = response.user.orders[index];
              this.getOrder(element.valueOf());
            }
          }
        },
        error => {
          console.log(error);
        }
      );      
    }else{
      this.router.navigate(['/logIn']);
    }
  }

  getOrder(orderID: string) {
    this._orderService.getOrder(orderID).subscribe(
      response => {
        this.order = response.order;
        this.orders.push(response.order);
      },
      error => {
        console.log(error);
      }
    );
  }
  problema(id){
    
  }
}
