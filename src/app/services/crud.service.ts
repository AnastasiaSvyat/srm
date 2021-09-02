import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Role } from '../model/role';
import { User } from '../model/user';
import { Employee } from '../model/Employee';

@Injectable({
  providedIn: 'root'
})

export class CrudService {

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

  // Add
  AddEmployee(employee: Employee): Observable<any> {
    let API_URL = `${this.REST_API}/add-employee`;
    return this.httpClient.post(API_URL, employee)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Get all objects
  GetStaff() {
    return this.httpClient.get(`${this.REST_API}`);
  }

  // Get single object
  GetEmployee(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/read-employee/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
  }

  // Update
  updateEmployee(id:any, employee:any): Observable<any> {
    let API_URL = `${this.REST_API}/update-employee/${id}`;
    return this.httpClient.put(API_URL, employee, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Delete
  deleteEmployee(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-employee/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders}).pipe(
        catchError(this.handleError)
      )
  }


  // Error 
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}