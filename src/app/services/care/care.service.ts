import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CareService {
  today!: any;
  month!: any;
  year!: any;
  week!: any;
  tomorrow!: any;

  constructor() {}

  REST_API = 'http://localhost:8000/api';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
