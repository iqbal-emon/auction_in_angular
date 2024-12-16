import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet ,RouterLink, RouterModule} from '@angular/router';
import { OrdersComponent } from './orders/orders.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,RouterOutlet,RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isSidebarOpen = false;
isOrdersActive: any;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
