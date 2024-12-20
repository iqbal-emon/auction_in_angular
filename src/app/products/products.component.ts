import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { ProductsService } from './products.service';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [CardComponent ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products:[]=[];

  constructor(private productService: ProductsService) {

  }

  trackByProduct(index: number, product: any): number {
    return product.id;
  }

  ngOnInit() {
    this.Load();
  }

  Load() {
    this.productService.products().subscribe({
      next: (response) => {
        this.products=response;
        console.log(this.products); // Handle the success response here
      },
      error: (error) => {
        console.error('Error fetching products:', error); // Handle any errors here
      }
    });
  }

}
