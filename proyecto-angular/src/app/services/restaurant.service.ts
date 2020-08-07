import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/infoSoda';
import { Global } from './global';

@Injectable()
export class RestaurantService{
    public url: string;
    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    testService(){
        return "Prueba ak7";
    }


    getRestaurant(id: string): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'get-restaurant/'+id,{headers:headers});
    }

    updateProject(restaurant): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let params = JSON.stringify(restaurant);
        return this._http.put(this.url+'update-restaurant/'+restaurant._id, params, {headers:headers});
    }
}