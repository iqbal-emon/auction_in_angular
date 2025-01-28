import { ProductsService } from './../products/products.service';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Env } from '../../environments/env';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  imports: [RouterLink, NgxSkeletonLoaderModule],
})
export class CardComponent {
  constructor(private productService: ProductsService) {}
  @Input() product: any;
  isLoading: boolean = true;
  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }
  getImageUrl(localPath: string): string {
    return this.productService.getImageUrl(localPath);
  }
  navigate(id: any) {
    this.navigate(['dashboard/product/', id]);
  }
}
