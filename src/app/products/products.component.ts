import { SignalRService } from './../add-product/signal-r.service';
import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  imports: [CardComponent], // You can remove this if you have this already in the module
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'], // Corrected styleUrl to styleUrls
})
export class ProductsComponent implements OnInit {
  products: any[] = [];

  constructor(
    private productService: ProductsService,
    private signalRService: SignalRService // Fixed the injection naming convention to 'signalRService'
  ) {}

  // trackBy function to optimize ngFor rendering
  trackByProduct(index: number, product: any): number {
    return product.id;
  }

  ngOnInit(): void {
    this.Load();
    this.signalRService.startConnection();

    this.signalRService.getNewProduct().subscribe((newProduct: any) => {
      this.products.push(newProduct);
    });

  }

  Load(): void {
    this.productService.products().subscribe({
      next: (response) => {
        this.products = response;
        console.log(this.products);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }
}
