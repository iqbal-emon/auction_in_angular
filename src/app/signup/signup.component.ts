import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { AuthServiceService } from './../login/auth-service.service';
import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,HttpClientModule,FormsModule  ],
  templateUrl: './signup.component.html',
  standalone:true,
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  selectedRole: string = 'seller';
  signupForm: FormGroup;
  isEmailExist:boolean=false;
  selectedFile: any;
  constructor(private fb: FormBuilder,private authService:AuthServiceService) {
    this.signupForm = this.fb.group({
      Username: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ImageURL:[null,Validators.required],
      role:['seller',Validators.required]
    });
  }
// Handle file selection
onFileSelected(event: any): void {
  this.selectedFile = event.target.files[0];
}
// Utility function to mark all form controls as touched
private markFormGroupTouched(formGroup: FormGroup): void {
  Object.values(formGroup.controls).forEach(control => {
    if (control instanceof FormGroup) {
      this.markFormGroupTouched(control); // Recursively mark nested form groups
    } else {
      control.markAsTouched(); // Mark control as touched
    }
  });
}

onSubmit(): void {
  console.log("Form data is", this.signupForm.value);

  if (this.signupForm.invalid) {
    this.markFormGroupTouched(this.signupForm);
    return;
  }

  if (this.signupForm.valid) {
    this.authService.signup(this.signupForm.value, this.selectedFile).subscribe({
      next: (response: any) => {
        console.log('Signup successful', response);
        alert('Signup successful!');
      },
      error: (err:HttpErrorResponse) => {


        // Check if the error response contains the message "Email already exists."
        if (err.status === 400 && err.error && err.error.message === "Email already exists.") {
          this.isEmailExist = true;
          alert('Email already exists!');
        } else {
          console.error('An unexpected error occurred:', err);
        }
      }
    });
  }
}

}
