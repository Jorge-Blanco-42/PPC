import { Component, ViewEncapsulation, ViewChild, ElementRef, SecurityContext, PipeTransform, Pipe, OnInit } from '@angular/core';
import { Restaurant } from './models/restaurant';
import { RestaurantService } from './services/restaurant.service';
import { Global } from './services/global';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserFacadeComponent } from './components/user-facade/user-facade.component';
import { CookieService } from 'ngx-cookie-service';  
import { SwPush } from '@angular/service-worker';
import { PushService } from './services/push.service';
import { Push } from './models/push';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RestaurantService, PushService]
})
export class AppComponent implements OnInit{
  public title: string ;
  public restaurant: Restaurant;
  public url: string;
  public push: Push;

  readonly VAPID_PUBLIC_KEY = "BNZT2ha3_BN2bo4IoTd2qmtHaQem-3CiyvzZNqD3JHeivHyVpCw7QbYkeBka7WTcIQdIlfqkFV43YnYNt-U1qlU";

  constructor(
    private swPush: SwPush,
    private _pushService: PushService,
    private _restaurantService: RestaurantService,
    public dialog: MatDialog,
    private _cookieService: CookieService
  ) { 
    this.restaurant = new Restaurant("","","","","","","","","","","");
    this.push = new Push("zxc");
    this.url = Global.url;
  }

  openDialog(): void {
    let user = JSON.parse(this._cookieService.get("user"));
    
    const dialogRef = this.dialog.open(UserFacadeComponent, {
      width: '50%',
      data: {role: user.role}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  subscribeToNotifications() {
    this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => this._pushService.savePush(new Push(JSON.stringify(sub))).subscribe())
    .catch(err => console.error("Could not subscribe to notifications", err));
}

  ngOnInit(): void {
    this.getRestaurant();
    this.subscribeToNotifications();
  }
  
  getRestaurant() {
  this._restaurantService.getRestaurant("5f2d75dccf9f4e41dcfe03ca").subscribe(
    response => {
      this.restaurant = response.restaurant;
      this.title = response.name;
    },
    error => {
      console.log(error);
    }
  );
  }
}

