import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { error } from 'protractor';


@Component({
  selector: 'editProduct',
  templateUrl: './editProduct.component.html',
  styleUrls: ['./editProduct.component.css'],
  providers: [ProductService, UploadService]
})
export class EditProductComponent implements OnInit {
  public title: string;
  public product: Product;
  public ogProduct: Product;
  public status: boolean;
  public sent: boolean;
  public filesToUpload: Array<File>;
  public saved_product: Product;
  public url: string;

  constructor(
    private _productService: ProductService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.title = 'Editar proyecto';
    this.sent = false;
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getProduct(id);
    });
  }

  getProduct(id: string) {
    this._productService.getProduct(id).subscribe(
      response => {
        this.product = response.product;
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(form) {
    this.sent = true;
    this._productService.updateProduct(this.product).subscribe(
      response => {
        if (response.productUpdated) {
          //subir imagen
          if (this.filesToUpload) {
            this._uploadService.makeFileRequest(Global.url + "upload-image/" + response.productUpdated._id, [], this.filesToUpload, 'image')
              .then((result: any) => {
                if (result) {
                  this.status = true;
                  this.product.image = result.product.image;
                  this.saved_product = result.productUpdated;
                } else {
                  this._productService.updateProduct(this.ogProduct);
                  this.status = false;                  
                }
              });
          } else {
            this.status = true;
            this.saved_product = response.productUpdated;
            this.product.image = response.productUpdated.image;
          }
         


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

  productImageFileChange(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
