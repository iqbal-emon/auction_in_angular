import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'https://localhost:7189/'; // Replace with your actual API endpoint

  products(): Observable<any> {
    return this.http.get(this.apiUrl+"product");
  }
}
