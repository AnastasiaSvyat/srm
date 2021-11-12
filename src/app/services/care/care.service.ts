import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CareService {
  today!: any;
  month!: any;
  year!: any;
  week!: any;
  tomorrow!: any;

  constructor() {
    this.month = (moment(new Date()).format('MM') as any);
    this.today = (moment(new Date()).format('DD') as any);
    this.year = (moment(new Date()).format('YY') as any);
    this.week = (moment(new Date()).format('WW') as any);
    this.tomorrow = Number(moment(new Date()).format('DD') as any);
  }

  REST_API = 'http://localhost:8000/api';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

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
