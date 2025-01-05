import { StatusChangeService } from './status-change.service';
import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertModalComponent } from "../alert-modal/alert-modal.component";

@Component({
  selector: 'app-customer-list',
  imports: [NgClass, AlertModalComponent],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css',
})
export class CustomerListComponent implements OnInit {
  customerList: any[] = [];
  isModalVisible: boolean=false;
  modalMessage: string = '';

  constructor(private statusChangeService: StatusChangeService) {}
  ngOnInit(): void {
    this.Load();
  }
  closeAlert() {
    this.isModalVisible = false;
  }
  Load() {
    this.statusChangeService.getUsers('buyer').subscribe({
      next: (response) => {
        this.customerList = response;
        console.log("customer list is",this.customerList);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  updateStatus(customer: any) {
    console.log('customer is', customer);
    this.statusChangeService
      .updateStatus(
        'buyer',
        customer.userId,
        customer.flag == '1' ? '0' : '1'
      )
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
  getImageUrl(localPath: string): string {
    // Replace the local path with the server URL
    return localPath
      .replace(
        'C:\\auctionBackend\\Images\\Uploads',
        'https://localhost:7189/images/Uploads'
      )
      .replace(/\\/g, '/');
  }
}
