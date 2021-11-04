import { Injectable } from '@angular/core';
import { User } from '../../model/user';
import { Role } from '../../model/role';
import { Employee } from 'src/app/model/Employee';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CareService } from '../care/care.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user!: User;

  constructor(private httpClient: HttpClient, private careService: CareService) {}

  isAuthorized(){
    return !!this.user;
  }

  hasRole(role: Role){
    return this.isAuthorized() && this.user.role === role;
  }

  checkRole(role: Role) {
    this.user = {role};
  }

  Login(employee: Employee): Observable<{token: string}> {
    const API_URL = `${this.careService.REST_API}/login`;
    return this.httpClient.post<{token: string}>(API_URL, employee);
  }
}
