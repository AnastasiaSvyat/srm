import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../../model/Employee';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  REST_API: string = 'http://localhost:8000/api';
  
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) { }

  AddEmployee(employee: Employee): Observable<any> {
    let API_URL = `${this.REST_API}/add-employee`;
    return this.httpClient.post(API_URL, employee)
      .pipe(
        catchError(this.handleError)
      )
  }
  GetStaff() {
    return this.httpClient.get(`${this.REST_API}`);
  }
  
  
  GetEmployee(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/read-employee/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
  }

  updateEmployee(id:any, employee:any): Observable<any> {
    let API_URL = `${this.REST_API}/update-employee/${id}`;
    return this.httpClient.put(API_URL, employee, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  deleteEmployee(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-employee/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders}).pipe(
        catchError(this.handleError)
      )
  }
  
  getStaffListPagination(params: any): Observable<any> {
    let API_URL = `${this.REST_API}/stafflist`;
    return this.httpClient.get<any>(API_URL, { params });
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
  getFiles(): Observable<any> {
    return this.httpClient.get(`${this.REST_API}/files`);
  }

}