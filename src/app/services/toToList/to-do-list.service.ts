import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToDoList } from 'src/app/model/ToDoList';
import { CareService } from '../care/care.service';
import { DataEmployeeService } from '../dataEmployee/dataEmployee.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {
  employee!: any;

  constructor(private httpClient: HttpClient, private dataEmplService: DataEmployeeService,
              private careService: CareService) {
    this.dataEmplService.data.subscribe(value => {
      this.employee = value;
    });
  }


  AddTask(data: ToDoList ): Observable<any> {
    const API_URL = `${this.careService.REST_API}/add-task`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.careService.handleError)
      );
  }

  GetAllTaskTomorrow() {
    const API_URL = `${this.careService.REST_API}/get-taskTomorrow/?email=${this.employee.email}&day=${this.careService.tomorrow + 1}&month=${this.careService.month}&year=${this.careService.year}`;
    return this.httpClient.get(API_URL);
  }

  GetAllTaskWeek() {
    const API_URL = `${this.careService.REST_API}/get-taskWeek/?email=${this.employee.email}&week=${this.careService.week}&year=${this.careService.year}`;
    return this.httpClient.get(API_URL);
  }

  GetAllTaskDate() {
    const API_URL = `${this.careService.REST_API}/get-taskDate/?email=${this.employee.email}&month=${this.careService.month}&day=${this.careService.today}&year=${this.careService.year}`;
    console.log(API_URL);

    return this.httpClient.get(API_URL);
  }

  SelectedTask(id: any): Observable<any> {
    const API_URL = `${this.careService.REST_API}/read-task/${id}`;
    return this.httpClient.get(API_URL, { headers: this.careService.httpHeaders })
      .pipe(map((res: any) => {
          return res || {};
        }),
        catchError(this.careService.handleError)
      );
  }

  UpdateTask(id: any, task: any): Observable<any> {
    const API_URL = `${this.careService.REST_API}/update-task/${id}`;
    return this.httpClient.put(API_URL, task, { headers: this.careService.httpHeaders })
      .pipe(
        catchError(this.careService.handleError)
      );
  }

  DeleteTask(id: any): Observable<any> {
    const API_URL = `${this.careService.REST_API}/delete-task/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.careService.httpHeaders}).pipe(
        catchError(this.careService.handleError)
      );
  }
}
