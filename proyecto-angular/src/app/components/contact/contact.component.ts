import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../models/restaurant';
import { RestaurantService } from '../../services/restaurant.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [RestaurantService]
})
export class ContactComponent implements OnInit {
  public url: string;
  public restaurant: Restaurant;
  public confirm: boolean;
  constructor(
    private _restaurantService: RestaurantService,
  ) { 
      this.url = Global.url;
      this.restaurant = new Restaurant("","","","","","","","","","","");
      this.confirm = false;
  }

  ngOnInit(): void {
    this.getRestaurant();

}

getRestaurant() {
  this._restaurantService.getRestaurant("5f2d75dccf9f4e41dcfe03ca").subscribe(
    response => {
      this.restaurant = response.restaurant;
    },
    error => {
      console.log(error);
    }
  );
}


}