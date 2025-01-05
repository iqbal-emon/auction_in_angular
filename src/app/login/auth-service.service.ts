import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { __param } from 'tslib';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private apiUrl = 'https://localhost:7111/api/Authentication/'; // Replace with your actual API endpoint
  private accessTokenSubject = new BehaviorSubject<string | null>(null);
  constructor(private http: HttpClient) {}

  signup(formData: any, files: File): Observable<any> {
    const formDataObject = new FormData();
    formDataObject.append('Username', formData.Username);
    formDataObject.append('Password', formData.Password);
    formDataObject.append('Email', formData.Email);
    formDataObject.append('ImageURL', files); // Ensure ImageURL is appended
    formDataObject.append('role', formData.role);

    return this.http.post(this.apiUrl + 'sign-up', formDataObject);
  }

  signin(data: any): Observable<any> {
    return this.http.post(this.apiUrl + 'login', {
      UserName: data.Email,
      password: data.Password,
      role: data.role,
    });
  }

  storeTokens(accessToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    // localStorage.setItem('refreshToken', refreshToken);
  }

  // Store access token
  setAccessToken(token: string) {
    this.accessTokenSubject.next(token);
    localStorage.setItem('accessToken', token); // Alternatively, use in-memory storage for sensitive apps
  }
  private getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken'); // Consider using secure cookies for refresh tokens
  }
  // Refresh access token
  refreshAccessToken(): Observable<string> {
    const refreshToken = this.getRefreshToken();
    return this.http
      .post<{ accessToken: string }>(`${this.apiUrl}refresh-token`, {
        refreshToken,
      }) // Adjust the endpoint as needed
      .pipe(
        tap((response) => {
          this.setAccessToken(response.accessToken);
        }),
        map((response) => response.accessToken)
      );
  }

  // Retrieve access token
  getAccessToken(): string | null {
    return this.accessTokenSubject.value || localStorage.getItem('accessToken');
  }
  isLoggedIn(): boolean {
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('userRole');
    return !!userId && !!role;
  }
  hasRole(requiredRole: string): boolean {
    const role = localStorage.getItem('userRole'); // Retrieve the user's role from localStorage
    return role === requiredRole;
  }
}
