import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route, Router , CanLoad} from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '../model/role'
import { CrudService } from '../services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class AppRoutingGuard implements CanActivate {
  constructor(
    private router: Router,
    private crudService: CrudService,


  ){}

  canActivate(
    route: ActivatedRouteSnapshot): Observable<boolean>| Promise<boolean>  | boolean  {
      if (!this.crudService.isAuthorized()) {
        this.router.navigate(['']);
        return false;
    }
    return true;
  }
  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.crudService.isAuthorized()) {
        return false;
    }
    return true;
  }
}
