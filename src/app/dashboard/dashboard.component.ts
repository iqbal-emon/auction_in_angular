import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  RouterOutlet,
  RouterLink,
  RouterModule,
  Router,
} from '@angular/router';
import { OrdersComponent } from './orders/orders.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  isSidebarOpen = false;
  isOrdersActive: any;
  userRole: any = localStorage.getItem('userRole');

  constructor(private router: Router) {}
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  logOut() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']).then(() => {
      // Replace the current history state to prevent back navigation
    window.history.replaceState(null, '', '/login');
    
    // Reload the page
    window.location.reload();
    });
  }
}
