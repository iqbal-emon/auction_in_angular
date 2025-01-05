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
    return this.http.get(this.apiUrl + 'api/items/activeProduct/0');
  }
  productsDetails(id: any): Observable<any> {
    https: return this.http.get(`${this.apiUrl}api/Items/biddingList/${id}`);
  }

  biddingList(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}api/Bidding/GetBids/${id}`);
  }

  AddBidding(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}api/Bidding/PlaceBid`, formData);
  }
}
