import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppRoutingGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isAuthorized()) {
      if (localStorage.getItem('token')) {
        return true;
      }
      else {
        return false;
      }
    }
    return true;
  }
  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isAuthorized()) {
      return false;
    }
    return true;
  }
}
