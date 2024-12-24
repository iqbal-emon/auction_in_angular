import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddProductService } from '../add-product/add-product.service';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';

@Component({
  selector: 'app-add-update-modal',
  templateUrl: './add-update-modal.component.html',
  styleUrls: ['./add-update-modal.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
})
export class AddUpdateModalComponent implements OnChanges, OnInit {
  productForm: FormGroup;
  selectedFile1: any;
  selectedFile2: any;
  selectedFile3: any;

  @Input() addModalShow: boolean = false;
  @Output() eventEmitter = new EventEmitter<any>();
  @Output() closeModalEvent = new EventEmitter<any>();
  @Input() itemId: any = null;
  categories: any = [];
  userId: any = localStorage.getItem('userId');

  formDataObject: any;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private addProductService: AddProductService
  ) {
    this.productForm = this.fb.group({
      productTitle: ['', [Validators.required]],
      productPrice: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required]],
      image1: [null, Validators.required],
      image2: [null, Validators.required],
      image3: [null, Validators.required],
      auctionStart: ['', Validators.required],
      auctionEnd: ['', Validators.required],
      category: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.getCategories();
  }
  getCategories(): void {
    this.addProductService.getCategories().subscribe({
      next: (response: any) => {
        console.log('Categories fetched successfully', response);
        this.categories = response;
      },
      error: (err: any) => {
        console.error('An unexpected error occurred:', err);
      },
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.itemId) {
      this.addProductService.getProductById(this.itemId).subscribe({
        next: (response: any) => {
          console.log('Product fetched successfully', response);
          this.productForm.patchValue({
            productTitle: response.title,
            productPrice: response.reservePrice,
            description: response.description,
            auctionStart: response.startTime,
            auctionEnd: response.endTime,
            category: response.category,
          });
          // Handle file inputs if they are part of the response
          if (response.image1) {
            this.productForm.patchValue({ image1: response.imageURL1 });
          }
          if (response.image2) {
            this.productForm.patchValue({ image2: response.imageURL2 });
          }
          if (response.image3) {
            this.productForm.patchValue({ image3: response.imageURL3 });
          }
        },
        error: (err: any) => {
          console.error('An unexpected error occurred:', err);
        },
      });
    }
    console.log('this.productForm', this.productForm.value);
  }

  onFileSelected1(event: any): void {
    this.selectedFile1 = event.target.files[0];
  }
  onFileSelected2(event: any): void {
    this.selectedFile2 = event.target.files[0];
  }
  onFileSelected3(event: any): void {
    this.selectedFile3 = event.target.files[0];
  }
  closeModal() {
    this.closeModalEvent.emit();
  }
  onSubmit(): void {
    // Check for invalid form
    if (this.productForm.invalid) {
      this.markFormGroupTouched(this.productForm); // Mark fields as touched
      return;
    }

    // Create FormData object
    const formDataObject = new FormData();

    // Append form data fields
    formDataObject.append('Title', this.productForm.get('productTitle')?.value);
    formDataObject.append(
      'ReservePrice',
      this.productForm.get('productPrice')?.value
    );
    formDataObject.append('UserId', this.userId);
    formDataObject.append('EndTime', this.productForm.get('auctionEnd')?.value);
    formDataObject.append(
      'StartTime',
      this.productForm.get('auctionStart')?.value
    );
    formDataObject.append(
      'Description',
      this.productForm.get('description')?.value
    );
    formDataObject.append('Category', this.productForm.get('category')?.value);

    // Append files if selected
    if (this.selectedFile1) {
      formDataObject.append('imageURL1', this.selectedFile1);
    }
    if (this.selectedFile2) {
      formDataObject.append('imageURL2', this.selectedFile2);
    }
    if (this.selectedFile3) {
      formDataObject.append('imageURL3', this.selectedFile3);
    }

    console.log('FormData submitted:', formDataObject);

    // Emit the form data object
    this.eventEmitter.emit(formDataObject);
  }

  // Utility function to mark all form controls as touched
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control); // Recursively mark nested form groups
      } else {
        control.markAsTouched(); // Mark control as touched
      }
    });
  }
}
