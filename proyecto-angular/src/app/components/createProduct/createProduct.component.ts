import { Component, ViewEncapsulation, ViewChild, ElementRef, SecurityContext, OnInit } from '@angular/core';
import { Global } from '../../services/global';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UploadService } from '../../services/upload.service';
import { SafePipe } from '../../pipes/Safe.pipe';

@Component({
  selector: 'createProduct',
  templateUrl: './createProduct.component.html',
  styleUrls: ['./createProduct.component.css'],
  providers: [ProductService, UploadService]
})
export class CreateProductComponent implements OnInit {
  public product: Product;
  public status: boolean;
  public sent: boolean;
  public saved_product: Product;
  public ImageUpload: Array<File>;
  public url: string;
  constructor(
    private _productService: ProductService,
    private _uploadService: UploadService
  ){ 
    this.product = new Product('','','','');
    this.sent = false;
    this.url = Global.url;
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    this.sent = true;
    this._productService.saveProduct(this.product).subscribe(
      response =>{
        if(response.product){          
          //subir imagen
          this._uploadService.makeFileRequest(Global.url+"upload-image-product/"+response.product._id,[],this.ImageUpload,'image')
          .then((result: any) =>{
            if(result){
              this.status = true;
              this.saved_product = response.product;
              form.reset();
            }else{
              this._productService.deleteProduct(response.project._id);
              this.status = false;
            }     
          });
          
        }else{
          this.status = false;
        }
        console.log(response);
      },
      error => {
        console.log(error);
      }

    );
  }

  productImageFileChange(fileInput: any){
    this.ImageUpload = <Array<File>>fileInput.target.files;
  }



}