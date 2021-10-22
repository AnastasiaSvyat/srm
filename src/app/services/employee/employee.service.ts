import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../../model/Employee';
import { ToDoList } from 'src/app/model/ToDoList';
import { CareService } from '../care/care.service';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor(private httpClient: HttpClient, private СareService:CareService) { }

  AddEmployee(employee: Employee): Observable<any> {
    let API_URL = `${this.СareService.REST_API}/add-employee`;
    return this.httpClient.post(API_URL, employee)
      .pipe(
        catchError(this.СareService.handleError)
      )
  }

  GetStaff() {
    return this.httpClient.get(`${this.СareService.REST_API}`);
  }
  
  
  GetEmployee(id:any): Observable<any> {
    let API_URL = `${this.СareService.REST_API}/read-employee/${id}`;
    return this.httpClient.get(API_URL, { headers: this.СareService.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.СareService.handleError)
      )
  }

  updateEmployee(id:any, employee:any): Observable<any> {
    let API_URL = `${this.СareService.REST_API}/update-employee/${id}`;
    return this.httpClient.put(API_URL, employee, { headers: this.СareService.httpHeaders })
      .pipe(
        catchError(this.СareService.handleError)
      )
  }

  deleteEmployee(id:any): Observable<any> {
    let API_URL = `${this.СareService.REST_API}/delete-employee/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.СareService.httpHeaders}).pipe(
        catchError(this.СareService.handleError)
      )
  }
  
  getStaffListPagination(params: any): Observable<any> {
    let API_URL = `${this.СareService.REST_API}/stafflist`;
    return this.httpClient.get<any>(API_URL, { params });
  }

  getFiles(): Observable<any> {
    return this.httpClient.get(`${this.СareService.REST_API}/files`);
  }

}