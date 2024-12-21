
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatusChangeService {
  apiUrl = 'https://localhost:7189/api/SellerStatus/';
  userUrl = "";
  constructor(private http: HttpClient) {}
  getUsers(user:any):Observable<any> {
    if (user == "seller") {
      this.userUrl = "Seller-list";

     
    }
    else if (user == "customer") {
       this.userUrl = 'Customer-list';
    }
    return this.http.get(this.apiUrl + this.userUrl);
  }



  updateStatus(userRole: any, userId: any,flag:any):Observable<any> {
    return this.http.put(this.apiUrl+"blockseller/" + userRole + '/'+userId+'/' + flag,null);
  }
}
