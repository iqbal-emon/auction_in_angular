import { Component } from '@angular/core';
import { StatusChangeService } from '../customer-list/status-change.service';
import { NgClass } from '@angular/common';
import { Env } from '../../environments/env';
import { AlertModalComponent } from "../alert-modal/alert-modal.component";

@Component({
  selector: 'app-products-list',
  imports: [NgClass, AlertModalComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {
productList: any[] = [];
  modalMessage: string = '';
  isModalVisible: boolean = false;
  constructor(private statusChangeService: StatusChangeService) {}
  updateStatus(product: any) {
    this.statusChangeService
      .updateStatus('product', product.itemID, product.flag == '1' ? '0' : '1')
      .subscribe({
        next: (response) => {
          this.modalMessage = response.message;
          this.isModalVisible = true;
          this.Load();
        },
        error: (error) => {
          console.error('Error fetching products:', error);
        },
      });
  }

  ngOnInit(): void {
    this.Load();
  }
  closeAlert() {
    this.isModalVisible = false;
  }
  Load() {
    this.statusChangeService.getAllProducts().subscribe({
      next: (response) => {
        this.productList = response;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  getImageUrl(localPath: string): string {
    // Replace the local path with the server URL
    return localPath
      .replace(
        'C:\\auctionBackend\\Images\\Uploads',
        Env.baseUrl+'/images/Uploads'
      )
      .replace(/\\/g, '/');
  }
}
