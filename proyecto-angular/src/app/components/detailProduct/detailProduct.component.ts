import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'detailProduct',
  templateUrl: './detailProduct.component.html',
  styleUrls: ['./detailProduct.component.css'],
  providers: [ProductService]
})
export class DetailProductComponent implements OnInit {
  public url: string;
  public product: Product;
  public confirm: boolean;
  constructor(
    private _productService: ProductService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = Global.url;
    this.product = new Product('','','','','');
    this.confirm = false;
   }

  ngOnInit(): void {
    this._route.params.subscribe(params =>{
      let id = params.id;
      this.getProduct(id);
    });
  }

  setConfirm(confirm){
    this.confirm = confirm;
  }

  getProduct(id: string){
    this._productService.getProduct(id).subscribe(
      response =>{
        this.product = response.product;
      },
      error =>{
        console.log(error);
      }
    );
  }

  deleteProduct(id: string){
    this._productService.deleteProduct(id).subscribe(
      response =>{
        if(response.product){
          this._router.navigate(['/mant-productos']);
        }
      },
      error =>{
        console.log(error);
      }
    );
  }
}
