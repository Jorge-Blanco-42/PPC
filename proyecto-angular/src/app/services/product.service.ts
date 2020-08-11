import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { Global } from './global';

@Injectable()
export class ProductService{
    public url: string;
    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    testService(){
        return "Prueba ak7";
    }

    saveProduct(product: Product): Observable<any>{
        let params = JSON.stringify(product);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url+'save-product',params,{headers:headers});
    }

    getProducts(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'get-products',{headers:headers});
    }

    getProduct(id: string): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'get-product/'+id,{headers:headers});
    }

    deleteProduct(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url+'delete-product/'+id, {headers:headers});
    }

    updateProduct(product): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let params = JSON.stringify(product);
        return this._http.put(this.url+'update-product/'+product._id, params, {headers:headers});
    }
}