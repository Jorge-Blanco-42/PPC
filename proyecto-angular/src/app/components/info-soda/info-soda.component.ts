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
  public ogRestaurant: Restaurant;
  public status: boolean;
  public sent: boolean;
  public ContactUpload: Array<File>;
  public mainUpload: Array<File>;
  public CartUpload: Array<File>;
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
        this.ogRestaurant = response.restaurant;
        console.log(this.restaurant);
      },
      error => {
        console.log(error);
      }
    );
  }

  imageUP(upload: Array<File>, response: any, type: string, property: string){
    if (upload) {
      this._uploadService.makeFileRequest(Global.url + "upload-"+ type +"/" + response.restaurantUpdated._id, [], upload, property)
        .then((result: any) => {
          if (result) {
            this.status = true;
            if(type == "imageR"){
              this.restaurant.mainLogo = result.restaurantUpdated.mainLogo;
            }else if(type == "imageCo"){
              this.restaurant.contactLogo = result.restaurantUpdated.contactLogo;
            }else{
              this.restaurant.cartLogo = result.restaurantUpdated.cartLogo;
            }
            this.saved_restaurant = result.restaurantUpdated;
          } else {
            this._restaurantService.updateRestaurant(this.ogRestaurant);
            this.status = false;                  
          }
        });
    } else {
      this.status = true;
      this.saved_restaurant = response.restaurantUpdated;
      if(type == "imageR"){
        this.restaurant.mainLogo = response.restaurantUpdated.mainLogo;
      }else if(type == "imageCo"){
        this.restaurant.contactLogo = response.restaurantUpdated.contactLogo;
      }else{
        this.restaurant.cartLogo = response.restaurantUpdated.cartLogo;
      }
      
    }
  }

  onSubmit(form) {
    this.sent = true;
    this._restaurantService.updateRestaurant(this.restaurant).subscribe(
      response => {
        if (response.restaurantUpdated) {
          //subir imagen
         this.imageUP(this.mainUpload, response,"imageR", "mainLogo");
         this.imageUP(this.ContactUpload, response,"imageCo", "contactLogo");
         this.imageUP(this.CartUpload, response,"imageCa", "cartLogo");
        } else {
          this.status = false;
        }
      },
      error => {
        this.status = false;
        console.log(error);
      }

    );
  }
  
  mainLogoFileChange(fileInput: any){
    this.mainUpload = <Array<File>>fileInput.target.files;
  }
  contactLogoFileChange(fileInput: any){
    this.ContactUpload = <Array<File>>fileInput.target.files;

  }
  cartLogoFileChange(fileInput: any){
    this.CartUpload = <Array<File>>fileInput.target.files;

  }
}
