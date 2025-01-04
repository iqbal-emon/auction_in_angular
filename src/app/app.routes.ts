import { OrdersComponent } from './dashboard/orders/orders.component';
// app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AddProductComponent } from './add-product/add-product.component';
import { SellerStatusComponent } from './seller-status/seller-status.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { AuthGuard } from './login/auth-guard';
import { UnAuthorizedComponent } from './un-authorized/un-authorized.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'add-product',
        component: AddProductComponent,
        canActivate: [AuthGuard],
        data: { role: 'seller' },
      },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [AuthGuard],
        data: { role: 'seller' },
      },
      {
        path: 'products',
        component: ProductsComponent,
        canActivate: [AuthGuard],
        data: { role: 'buyer' },
      },
      {
        path: 'products/:itemId',
        component: ProductDetailsComponent,
        canActivate: [AuthGuard],
        data: { role: 'buyer' },
      },
      {
        path: 'seller-status',
        component: SellerStatusComponent,
        canActivate: [AuthGuard],
        data: { role: 'admin' },
      },
      {
        path: 'customer-status',
        component: CustomerListComponent,
        canActivate: [AuthGuard],
        data: { role: 'admin' },
      },
      {
        path: 'product-status',
        component: ProductsListComponent,
        canActivate: [AuthGuard],
        data: { role: 'admin' },
      },
    ],
  },
  {
    path: 'unauthorized',
    component: UnAuthorizedComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
