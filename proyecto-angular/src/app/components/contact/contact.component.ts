import { Component, ViewEncapsulation, ViewChild, ElementRef, SecurityContext, OnInit } from '@angular/core';
import { Restaurant } from '../../models/restaurant';
import { RestaurantService } from '../../services/restaurant.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { SafePipe } from '../../pipes/Safe.pipe';


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
  public mapURL: string;
  public prueba : string;
  constructor(
    private _restaurantService: RestaurantService,
  ) { 
      this.url = Global.url;
      this.restaurant = new Restaurant("","","","","","","","","","","");
      this.confirm = false;
      this.getRestaurant();
      this.prueba= "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.6577696283225!2d-84.05808028474245!3d9.962405076412747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0e45e4b99d1c7%3A0xbb2d4e22942064f0!2sLincoln%20Plaza%2C%20Av%2065%2C%20Los%20Colegios%2C%20San%20Jos%C3%A9%2C%20San%20Vicente!5e0!3m2!1ses!2scr!4v1596814521750!5m2!1ses!2scr"
  }

  ngOnInit(): void {
        console.log(this.restaurant.address);
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