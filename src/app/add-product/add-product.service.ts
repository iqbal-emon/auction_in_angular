import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Env } from '../../environments/env';

@Injectable({
  providedIn: 'root',
})
export class AddProductService {
  userId: any = localStorage.getItem('userId');
  constructor(private http: HttpClient) {}
  private apiUrl = Env.baseUrl;
  AddProduct(formData: any): Observable<any> {
    // alert('form is');
    console.log('form is', formData);
    return this.http.post(this.apiUrl + 'api/Items/add-product', formData);
  }

  updateProduct(formData: any, itemId: any): Observable<any> {
    return this.http.put(
      this.apiUrl + `api/Product/UpdateProduct/${itemId}`,
      formData
    ); // Ensure the correct API endpoint is used
  }
  getProduct(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}api/Product/GetProductsByUserId/${this.userId}`
    );
  }
  getProductById(itemId: any): Observable<any> {
    return this.http.get(
      `${this.apiUrl}api/Product/GetProductByItemId/${itemId}`
    );
  }
  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}api/Category/GetCategories`);
  }
}
