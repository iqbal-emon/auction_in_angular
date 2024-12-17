import { ProductsService } from './../products/products.service';
import { routes } from './../app.routes';
import { Component, NgModule } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-product-details',
  imports: [DatePipe, FormsModule,AlertModalComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  itemId!: any;
  details: any;
  enterPrice: any;
  biddingList: any[] = [];
  customerID: any | undefined;
  maxAmount:any;
  modalStatus:boolean=false;
  modalMessage:string=''

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
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

  openModal() {
    this.isModalVisible = true;
    console.log("moda is",this.isModalVisible);
  }

  closeModal() {
    this.isModalVisible = false;
  }
  Load(id: any) {

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
        console.log("response is",response);
        this.biddingList = response.bids;
        this.maxAmount=response.maxAmount;
        console.log('bidding list', this.biddingList);
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
      next: (response) => {
        console.log('reponse it coming');
        this.modalMessage=response;
        this.BiddingList(this.itemId);
        this.openModal();

        this.enterPrice=0;
       
      },
      error: (error) => {
        this.openModal();
        this.modalMessage=error.error;
        console.error('Error fetching products:', error);
      },
    });
  }

  getImageUrl(localPath: string): string {
    return localPath
      .replace(
        'D:\\auctionBackend\\Images\\Uploads',
        'https://localhost:7189/images/Uploads'
      )
      .replace(/\\/g, '/');
  }
}
