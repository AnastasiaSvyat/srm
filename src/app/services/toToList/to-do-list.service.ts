import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Employee } from 'src/app/model/Employee';
import { ToDoList } from 'src/app/model/ToDoList';
import { AuthService } from '../auth/auth.service';
import { CareService } from '../care/care.service';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {
  employee!: Employee;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private careService: CareService) {
      this.employee = this.authService.user;
  }


  AddTask(data: ToDoList): Observable<any> {
    console.log(data);
    const API_URL = `${this.careService.REST_API}/add-task`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.careService.handleError)
      );
  }

  GetAllTaskTomorrow(employee: Employee): Observable<ToDoList[]> {
    const API_URL = `${this.careService.REST_API}/get-taskTomorrow/?idEmployee=${employee.id}`;
    return this.httpClient.get<ToDoList[]>(API_URL);
  }

  GetAllTaskWeek(employee: Employee): Observable<ToDoList[]> {
    const API_URL = `${this.careService.REST_API}/get-taskWeek/?idEmployee=${employee.id}`;
    return this.httpClient.get<ToDoList[]>(API_URL);
  }

  GetAllTaskDate(employee: Employee): Observable<ToDoList[]> {
    console.log(employee.id);
    const API_URL = `${this.careService.REST_API}/get-taskDate/?idEmployee=${employee.id}`;
    return this.httpClient.get<ToDoList[]>(API_URL);
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
    return this.httpClient.delete(API_URL, { headers: this.careService.httpHeaders }).pipe(
      catchError(this.careService.handleError)
    );
  }
}
