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

  constructor(private httpClient: HttpClient, private careService:CareService) { }

  AddEmployee(employee: Employee): Observable<any> {
    let API_URL = `${this.careService.REST_API}/add-employee`;
    return this.httpClient.post(API_URL, employee)
      .pipe(
        catchError(this.careService.handleError)
      )
  }

  GetStaff() {
    return this.httpClient.get(`${this.careService.REST_API}`);
  }
  
  
  GetEmployee(id:any): Observable<any> {
    let API_URL = `${this.careService.REST_API}/read-employee/${id}`;
    return this.httpClient.get(API_URL, { headers: this.careService.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.careService.handleError)
      )
  }

  updateEmployee(id:any, employee:any): Observable<any> {
    let API_URL = `${this.careService.REST_API}/update-employee/${id}`;
    return this.httpClient.put(API_URL, employee, { headers: this.careService.httpHeaders })
      .pipe(
        catchError(this.careService.handleError)
      )
  }

  deleteEmployee(id:any): Observable<any> {
    let API_URL = `${this.careService.REST_API}/delete-employee/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.careService.httpHeaders}).pipe(
        catchError(this.careService.handleError)
      )
  }
  
  getStaffListPagination(params: any): Observable<any> {
    let API_URL = `${this.careService.REST_API}/stafflist`;
    return this.httpClient.get<any>(API_URL, { params });
  }

  getFiles(): Observable<any> {
    return this.httpClient.get(`${this.careService.REST_API}/files`);
  }

}