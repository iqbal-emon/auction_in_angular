import { AddProductService } from './add-product.service';
import { Component, OnInit } from '@angular/core';
import { AddUpdateModalComponent } from '../add-update-modal/add-update-modal.component';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { Env } from '../../environments/env';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-add-product',
  imports: [AddUpdateModalComponent, AlertModalComponent],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  constructor(
    private addProductService: AddProductService,
    private productService: ProductsService
  ) {}
  products: any = [];
  modalShow: boolean = false;
  modalMessage: any = '';
  itemId: any;
  isModalVisible: boolean = false;
  ngOnInit() {
    this.onLoad();
  }

  AddModal() {
    this.modalShow = true;
    this.itemId = null;
  }
  closeModal() {
    this.modalShow = false;
  }
  closeAlert() {
    this.isModalVisible = false;
  }
  AddProduct(data: any) {
    console.log('data is', data);
    if (this.itemId == null) {
      console.log('its going');
      this.addProductService.AddProduct(data).subscribe({
        next: (response: any) => {
          this.modalMessage = response.message;
          this.closeModal();
          this.isModalVisible = true;
          this.onLoad();
        },
        error: (err: any) => {
          console.error('An unexpected error occurred:', err);
        },
      });
    }
    if (this.itemId != null) {
      this.addProductService.updateProduct(data, this.itemId).subscribe({
        next: (response: any) => {
          this.modalMessage = response.message;
          this.isModalVisible = true;
          this.itemId = null;
          this.closeModal();
          this.onLoad();
        },
        error: (err: any) => {
          console.error('An unexpected error occurred:', err);
        },
      });
    }
  }
  getImageUrl(localPath: string): string {
    return this.productService.getImageUrl(localPath);
  }
  EditProduct(product: any) {
    console.log('product', product);
    this.itemId = product.itemID;
    this.modalShow = true;
    console.log('itemId', this.itemId);
  }
  DeleteProduct(product: any) {
    console.log('product', product);
  }

  onLoad() {
    this.addProductService.getProduct().subscribe({
      next: (response: any) => {
        this.products = response;
        console.log('Products fetched successfully', response);
      },
      error: (err) => {
        console.error('An unexpected error occurred:', err);
      },
    });
  }
}
