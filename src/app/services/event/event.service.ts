import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Events } from 'src/app/model/Events';
import { CareService } from '../care/care.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

// today!:any 
// month!:any
// year!:any

constructor(private httpClient: HttpClient, private careService: CareService) {

 }

 
  AddEvent(data:Events ): Observable<any> {
    let API_URL = `${this.careService.REST_API}/add-event`;
      return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.careService.handleError)
      )
  }
  
  GetAllEvents() {
    let API_URL = `${this.careService.REST_API}/get-event/?year=${this.careService.year}`;
    return this.httpClient.get(API_URL);
  }


  GetEventMonth() {
    let API_URL = `${this.careService.REST_API}/getEvent-month/?month=${this.careService.month}&year=${this.careService.year}`;
      return this.httpClient.get(API_URL);
  }

  GetAllEventToday() {
    let API_URL = `${this.careService.REST_API}/getEvent-today/?day=${this.careService.today}&year=${this.careService.year}`;
      return this.httpClient.get(API_URL);
  }

  SelectedEvent(id:any): Observable<any> {
    let API_URL = `${this.careService.REST_API}/read-event/${id}`;
      return this.httpClient.get(API_URL, { headers: this.careService.httpHeaders })
        .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.careService.handleError)
      )
  }

  UpdateEmployee(id:any, event:any): Observable<any> {
    let API_URL = `${this.careService.REST_API}/update-event/${id}`;
    return this.httpClient.put(API_URL, event, { headers: this.careService.httpHeaders })
      .pipe(
        catchError(this.careService.handleError)
      )
  }

  DeleteEvent(id:any): Observable<any> {
    let API_URL = `${this.careService.REST_API}/delete-event/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.careService.httpHeaders}).pipe(
        catchError(this.careService.handleError)
      )
  }
}