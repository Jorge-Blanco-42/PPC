import { Component, ViewEncapsulation, ViewChild, ElementRef, SecurityContext, PipeTransform, Pipe, OnInit } from '@angular/core';
import { Restaurant } from './models/restaurant';
import { RestaurantService } from './services/restaurant.service';
import { Global } from './services/global';


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
    private _restaurantService: RestaurantService
  ) { 
    this.restaurant = new Restaurant("","","","","","","","","","","");
    this.url = Global.url;
  }
  ngOnInit(): void {
    this.getRestaurant();
  }
  
  getRestaurant() {
  this._restaurantService.getRestaurant("5f2d75dccf9f4e41dcfe03ca").subscribe(
    response => {
      this.restaurant = response.restaurant;
      this.title = response.name;
      console.log(this.restaurant);
    },
    error => {
      console.log(error);
    }
  );
  }
}

