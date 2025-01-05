
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Env } from '../../environments/env';

@Injectable({
  providedIn: 'root',
})
export class StatusChangeService {
  private apiUrl = Env.baseUrl ;
  userUrl = '';
  constructor(private http: HttpClient) {}
  getUsers(user: any): Observable<any> {
    if (user == 'seller') {
      this.userUrl = 'seller';
    } else if (user == 'buyer') {
      this.userUrl = 'buyer';
    }
    console.log(this.apiUrl + this.userUrl);
    return this.http.get(this.apiUrl+'api/Status/getstatus/'+this.userUrl);
  }

  getAllProducts(): Observable<any> {

    return this.http.get(this.apiUrl + "api/product/product-list");
  }

  updateStatus(userRole: any, userId: any, flag: any): Observable<any> {
    return this.http.put(
      this.apiUrl +
        'api/Status/blockseller/' +
        userRole +
        '/' +
        userId +
        '/' +
        flag,
      null
    );
  }
}
