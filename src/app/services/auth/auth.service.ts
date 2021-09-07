import { Injectable } from '@angular/core';
import { User } from '../../model/user';
import { Role } from '../../model/role';
import { Employee } from 'src/app/model/Employee';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Node/Express API
  REST_API: string = 'http://localhost:8000/api';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  private user!:User 
  constructor(private httpClient: HttpClient) { }
  
  
  isAuthorized(){
    return !!this.user
  }
  hasRole(role :Role){
    return this.isAuthorized() && this.user.role === role
  }
  checkRole(role: Role) {
    this.user = {role : role}
  }
  
  //Login Employee
  Login(employee: Employee): Observable<{token:string}> {
    console.log(employee);
    
    let API_URL = `${this.REST_API}/login`;
    return this.httpClient.post<{token:string}>(API_URL,employee)
  }
 
}
