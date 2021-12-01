import { Injectable } from '@angular/core';
import { User } from '../../model/user';
import { Role } from '../../model/role';
import { Employee } from 'src/app/model/Employee';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CareService } from '../care/care.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user!: any;
  private userSubject: BehaviorSubject<any>;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private careService: CareService) {
      this.userSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user') || 'null'));
    }

  isAuthorized() {
      this.user = this.userSubject.value;
      return !!this.user;
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/']);
}

  hasRole(role: Role) {
    return this.isAuthorized() && this.user.role === role;
  }

  checkRole(role: Role) {
    this.user = { role };
  }

  Login(employee: Employee): Observable<{ token: string }> {
    const API_URL = `${this.careService.REST_API}/login`;
    return this.httpClient.post<{ token: string }>(API_URL, employee)
    .pipe(map(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
      console.log(user);
      return user;
  }));
  }
}
