import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddProductService {
  userId: any = localStorage.getItem('userId');
  constructor(private http: HttpClient) {}
  private apiUrl = 'https://localhost:7189/'; // Replace with your actual API endpoint
  AddProduct(formData: any): Observable<any> {
    alert('form is');
    console.log('form is', formData);
    return this.http.post(this.apiUrl + 'InsertProduct', formData);
  }

  updateProduct(formData: any, itemId: any): Observable<any> {
    return this.http.put(this.apiUrl + `UpdateProduct/${itemId}`, formData); // Ensure the correct API endpoint is used
  }
  getProduct(): Observable<any> {
    return this.http.get(`${this.apiUrl}GetProductsByUserId/${this.userId}`);
  }
  getProductById(itemId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}GetProductByItemId/${itemId}`);
  }
  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}api/Category/GetCategories`);
  }
}
