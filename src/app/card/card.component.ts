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
  @Input() product: any;
  getImageUrl(localPath: string): string {
    // Replace the local path with the server URL
    return localPath
      .replace(
        'C:\\auctionBackend\\Images\\Uploads',
        Env.baseUrl + '/images/Uploads'
      )
      .replace(/\\/g, '/');
  }
  navigate(id: any) {
    this.navigate(['dashboard/product/', id]);
  }
}
