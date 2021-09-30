import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToDoList } from 'src/app/model/ToDoList';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {

  
  REST_API: string = 'http://localhost:8000/api';
  
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) { }

 
  AddTask(data:ToDoList ): Observable<any> {
    let API_URL = `${this.REST_API}/add-task`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }
  
  
  GetAllTask() {
    let API_URL = `${this.REST_API}/get-task`;
      return this.httpClient.get(API_URL);
  }

  SelectedTask(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/read-task/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
  }

  UpdateTask(id:any, task:any): Observable<any> {
    let API_URL = `${this.REST_API}/update-task/${id}`;
    return this.httpClient.put(API_URL, task, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  DeleteTask(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-task/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders}).pipe(
        catchError(this.handleError)
      )
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

}
