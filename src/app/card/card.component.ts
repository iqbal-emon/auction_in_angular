import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() product: any;
  getImageUrl(localPath: string): string {
    // Replace the local path with the server URL
    return localPath.replace("D:\\auctionBackend\\Images\\Uploads", "https://localhost:7189/images/Uploads").replace(/\\/g, "/");
  }
}
