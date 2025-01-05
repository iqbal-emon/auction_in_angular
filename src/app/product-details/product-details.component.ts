import { SignalRService } from './../add-product/signal-r.service';
import { ProductsService } from './../products/products.service';
import { routes } from './../app.routes';
import { Component, NgModule } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { SignupComponent } from '../signup/signup.component';
import { Env } from '../../environments/env';

@Component({
  selector: 'app-product-details',
  imports: [DatePipe, FormsModule, AlertModalComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  itemId!: any;
  details: any;
  enterPrice: number = 0;
  biddingList: any[] = [];
  customerID: any | undefined;
  maxAmount: any;
  modalStatus: boolean = false;
  modalMessage: string = '';
  new: any;
  currentDate: Date = new Date();
  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private signalRService: SignalRService
  ) {}
  ngOnInit() {
    this.customerID = Number(localStorage.getItem('userId'));

    this.route.paramMap.subscribe((params) => {
      const id = params.get('itemId');
      if (id) {
        this.itemId = Number(id);
        this.Load(id);
        this.BiddingList(id);
      }
    });
  }
  isModalVisible = false;
  isExpired(): boolean {
    if (!this.details.endTime) return false;
    const endTime = new Date(this.details.endTime);
    return endTime > this.currentDate;
  }
  openModal() {
    this.isModalVisible = true;
    console.log('moda is', this.isModalVisible);
  }

  closeModal() {
    this.isModalVisible = false;
  }
  Load(id: any) {
    this.signalRService.startConnection();

    this.signalRService.getNewBid().subscribe((newBid: any) => {
      this.biddingList.push(newBid);
    });

    this.productService.productsDetails(id).subscribe({
      next: (response) => {
        this.details = response;
        console.log(this.details);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  BiddingList(id: any) {
    this.productService.biddingList(id).subscribe({
      next: (response) => {
        console.log('response is', response);
        this.biddingList = response.bids;
        this.maxAmount = response.maxBidAmount;
        console.log('bidding list', this.maxAmount);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  AddBid() {
    const formData = {
      itemID: this.itemId,
      customerID: this.customerID,
      amount: this.enterPrice,
    };

    this.productService.AddBidding(formData).subscribe({
      next: (response: any) => {
        console.log('reponse it coming', response);
        this.modalMessage = response.message;
        this.BiddingList(this.itemId);
        this.openModal();

        this.enterPrice = 0;
      },
      error: (error) => {
        this.openModal();
        this.modalMessage = error.error.message;
        console.error('Error fetching products:', error);
      },
    });
  }

  getImageUrl(localPath: string): string {
    return localPath
      .replace(
        'C:\\auctionBackend\\Images\\Uploads',
        Env.baseUrl + '/images/Uploads'
      )
      .replace(/\\/g, '/');
  }
}
