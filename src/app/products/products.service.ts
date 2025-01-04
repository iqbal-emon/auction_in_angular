import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Env } from '../../environments/env';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  private apiUrl = Env.baseUrl ;

  products(): Observable<any> {
    console.log("apiUrl",this.apiUrl);
    return this.http.get(this.apiUrl + 'api/items/activeProduct');
  }
  productsDetails(id: any): Observable<any> {
    https: return this.http.get(`${this.apiUrl}api/Product/GetProductByItemId/${id}`);
  }

  biddingList(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}api/Bidding/getBidByItemId/${id}`);
  }

  AddBidding(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}api/Bidding/createBid`, formData);
  }
}
