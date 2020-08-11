import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { Global } from './global';

@Injectable()
export class OrderService{
    public url: string;
    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    testService(){
        return "Prueba ak7";
    }

    saveOrder(order: Order): Observable<any>{
        let params = JSON.stringify(order);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url+'save-order',params,{headers:headers});
    }

    getOrder(id: string): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'get-order/'+id,{headers:headers});
    }

    getOrders(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'get-orders',{headers:headers});
    }

    updateOrder(order): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let params = JSON.stringify(order);
        return this._http.put(this.url+'update-order/'+order._id, params, {headers:headers});
    }
}