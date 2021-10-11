import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Request } from 'src/app/model/Request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  REST_API: string = 'http://localhost:8000/api';
  
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) { }

 
  AddRequest(data:Request): Observable<any> {
    let API_URL = `${this.REST_API}/add-request`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }
  
  
  GetAllRequest() {
    let API_URL = `${this.REST_API}/get-request`;

    return this.httpClient.get(API_URL);
  }

  SelectedRequest(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/read-request/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
  }

  UpdateRequest(id:any, event:any): Observable<any> {
    let API_URL = `${this.REST_API}/update-request/${id}`;
    return this.httpClient.put(API_URL, event, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  DeleteRequest(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-request/${id}`;
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
