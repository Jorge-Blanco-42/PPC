import { Component, ViewEncapsulation, ViewChild, ElementRef, SecurityContext, PipeTransform, Pipe, OnInit } from '@angular/core';
import { Restaurant } from './models/restaurant';
import { RestaurantService } from './services/restaurant.service';
import { Global } from './services/global';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserFacadeComponent } from './components/user-facade/user-facade.component';
import { CookieService } from 'ngx-cookie-service';  


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RestaurantService]
})
export class AppComponent implements OnInit{
  public title: string ;
  public restaurant: Restaurant;
  public url: string;
  constructor(
    private _restaurantService: RestaurantService,
    public dialog: MatDialog,
    private _cookieService: CookieService
  ) { 
    this.restaurant = new Restaurant("","","","","","","","","","","");
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


  ngOnInit(): void {
    this.getRestaurant();
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

