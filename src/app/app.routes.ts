import { OrdersComponent } from './dashboard/orders/orders.component';
// app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    children:[
      {
        path:'orders',
        component:OrdersComponent
      },
      {
        path:'products',
        component:ProductsComponent
      }
    ]
  }
];
