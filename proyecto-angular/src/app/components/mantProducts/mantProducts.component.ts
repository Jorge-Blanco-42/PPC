import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-mantProducts',
  templateUrl: './mantProducts.component.html',
  styleUrls: ['./mantProducts.component.css'],
  providers: [ProductService]
})
export class MantProductsComponent implements OnInit {
  public products: Array<Product>;
  public url: string;
  constructor(
    private _productService: ProductService
  ) { 
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this._productService.getProducts().subscribe(
      response =>{
        if(response.product){
          this.products = response.product;
        }
      },
      error =>{
        console.log(error);
      }
    );
  }

}
