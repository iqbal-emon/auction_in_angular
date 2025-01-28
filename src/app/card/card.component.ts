import { ProductsService } from './../products/products.service';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Env } from '../../environments/env';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  imports: [RouterLink],
})
export class CardComponent {
  constructor(private productService: ProductsService) {}
  @Input() product: any;
  getImageUrl(localPath: string): string {
    return this.productService.getImageUrl(localPath);
  }
  navigate(id: any) {
    this.navigate(['dashboard/product/', id]);
  }
}
