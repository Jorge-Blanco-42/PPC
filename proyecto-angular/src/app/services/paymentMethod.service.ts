import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentMethod } from '../models/paymentMethod';
import { Global } from './global';

@Injectable()
export class PaymentMethodService{
    public url: string;
    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    savePayment(method: PaymentMethod): Observable<any>{
        let params = JSON.stringify(method);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url+'save-payment-method',params,{headers:headers});
    }

    getPayments(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'get-payments',{headers:headers});
    }

    getPayment(id: string): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'get-payment/'+id,{headers:headers});
    }

    deletePayment(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url+'delete-payment/'+id, {headers:headers});
    }

    updatePayment(payment): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let params = JSON.stringify(payment);
        return this._http.put(this.url+'update-payments/'+payment._id, params, {headers:headers});
    }
}