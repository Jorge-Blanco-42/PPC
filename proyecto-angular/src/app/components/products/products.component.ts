import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit {
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
