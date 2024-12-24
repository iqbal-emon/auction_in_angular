import { AuthServiceService } from './auth-service.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authServiceService: AuthServiceService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRole = route.data['role'] as string;

    if (!this.authServiceService.isLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    }

    if (requiredRole && !this.authServiceService.hasRole(requiredRole)) {
      this.router.navigate(['unauthorized']);
      return false;
    }

    return true;
  }
}
