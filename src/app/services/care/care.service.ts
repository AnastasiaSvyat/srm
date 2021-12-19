import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CareService {

  constructor() { }

  REST_API = 'http://localhost:8000/api';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
