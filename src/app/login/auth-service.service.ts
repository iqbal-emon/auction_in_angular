import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { __param } from 'tslib';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private apiUrl = 'https://localhost:7189/'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  signup(formData: any, files: File): Observable<any> {
    const formDataObject = new FormData();
    formDataObject.append('Username', formData.Username);
    formDataObject.append('Password', formData.Password);
    formDataObject.append('Email', formData.Email);
    formDataObject.append('ImageURL', files); // Ensure ImageURL is appended
    formDataObject.append('role', formData.role);

    return this.http.post(this.apiUrl+"SignUp", formDataObject);
  }


  signin(data: any): Observable<any> {
    const params = new HttpParams()
      .set('email', data.Email)
      .set('password', data.Password)
      .set('role',data.role);


    return this.http.get(this.apiUrl+'AuctionSystemLogIn', { params });
  }

}
