import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Push } from '../models/push';
import { Global } from './global';

@Injectable()
export class PushService{
    public url: string;
    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    savePush(push: Push): Observable<any>{
        let params = JSON.stringify(push);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url+'save-push',params,{headers:headers});
    }

    getPushs(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'get-pushs',{headers:headers});
    }

    getPush(id: string): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'get-push/'+id,{headers:headers});
    }
}