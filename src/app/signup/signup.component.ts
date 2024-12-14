import { HttpClient, HttpClientModule } from '@angular/common/http';
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
      role:['Seller',Validators.required]
    });
  }
// Handle file selection
onFileSelected(event: any): void {
  this.selectedFile = event.target.files[0];
}

  onSubmit(): void {
    console.log("data is",this.signupForm.value);
    this.authService.signup(this.signupForm.value,this.selectedFile).subscribe({
      next: (response: any) => {
        console.log('Signup successful', response);
        alert('Signup successful!');
      },
      error: (err: any) => {
        if(err.error=="Email already exists."){
          this.isEmailExist=true;
        }

      }
    });
  }
}
