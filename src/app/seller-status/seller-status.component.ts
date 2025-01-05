import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StatusChangeService } from '../customer-list/status-change.service';
import { AlertModalComponent } from "../alert-modal/alert-modal.component";
import { Env } from '../../environments/env';

@Component({
  selector: 'app-seller-status',
  imports: [NgClass, AlertModalComponent],
  templateUrl: './seller-status.component.html',
  styleUrl: './seller-status.component.css',
})
export class SellerStatusComponent {
  sellerList: any[] = [];
  modalMessage: string = '';
  isModalVisible: boolean = false;
  constructor(private statusChangeService: StatusChangeService) {}
  updateStatus(seller: any) {
    this.statusChangeService
      .updateStatus('seller', seller.userId, seller.flag == '1' ? '0' : '1')
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
    this.statusChangeService.getUsers('seller').subscribe({
      next: (response) => {
        this.sellerList = response;
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
