import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Events } from 'src/app/model/Events';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  
  REST_API: string = 'http://localhost:8000/api';
  
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) { }

 
  AddEvent(data:Events ): Observable<any> {
    let API_URL = `${this.REST_API}/add-event`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }
  
  
  GetAllEvents() {
    let API_URL = `${this.REST_API}/get-event`;

    return this.httpClient.get(API_URL);
  }

  SelectedEvent(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/read-event/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
  }

  UpdateEmployee(id:any, event:any): Observable<any> {
    let API_URL = `${this.REST_API}/update-event/${id}`;
    return this.httpClient.put(API_URL, event, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  DeleteEvent(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-event/${id}`;
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
