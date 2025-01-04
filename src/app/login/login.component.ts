import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthServiceService } from './auth-service.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule, HttpClientModule, FormsModule],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  errorMessage: string = '';
  signinForm: FormGroup;
  isEmailExist: boolean = false;
  selectedFile: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router
  ) {
    this.signinForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(4)]],
      role: ['admin', Validators.required],
    });
  }

  onSubmit() {
    if (this.signinForm.valid) {
      this.authService.signin(this.signinForm.value).subscribe({
        next: (response: any) => {
          console.log('userId is', JSON.stringify(response));
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('userRole', response.role);
          this.authService.storeTokens(response.token);
          this.router.navigate(['/dashboard']); // Example redirect after login success
        },
        error: (err) => {
          this.errorMessage = err?.error || 'An error occurred during sign-in.';
        },
      });
    } else {
      // Optionally handle invalid form case here
      console.log('Form is invalid');
    }
  }
  storeTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }
  // Get the access token
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  // Get the refresh token
  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }
}
