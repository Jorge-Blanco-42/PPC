import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../models/restaurant';
import { RestaurantService } from '../../services/restaurant.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'info-soda',
  templateUrl: './info-soda.component.html',
  styleUrls: ['./info-soda.component.css'],
  providers: [RestaurantService, UploadService]
})
export class InfoSodaComponent implements OnInit {
  public title: string;
  public restaurant: Restaurant;
  public status: boolean;
  public sent: boolean;
  public filesToUpload: Array<File>;
  public saved_restaurant: Restaurant;
  public url: string;
  private _route: ActivatedRoute
  constructor(
    private _restaurantService: RestaurantService,
    private _uploadService: UploadService
  ) { 
    this.restaurant = new Restaurant("","","","","","","","","","","");
    this.sent = false;
    this.url = Global.url;
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

  onSubmit(form){
    console.log(this.restaurant);
  }

}
