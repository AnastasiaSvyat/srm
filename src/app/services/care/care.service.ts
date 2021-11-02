import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CareService {
  today!:any 
  month!:any
  year!:any
  week!:any
  tomorrow!:any
d!:any

  constructor() { 
    this.d = new Date
    this.month = <any>moment(new Date).format('MM')
    this.today = <any>moment(new Date).format('DD')
    this.year = <any>moment(new Date).format('YY')
    this.week = <any>moment(new Date).format('WW')
    this.tomorrow = Number(<any>moment(new Date).format('DD'))  
  }
  
  REST_API: string = 'http://localhost:8000/api';
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
