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

constructor(private httpClient: HttpClient, private СareService: CareService) { }

 
  AddEvent(data:Events ): Observable<any> {
    let API_URL = `${this.СareService.REST_API}/add-event`;
      return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.СareService.handleError)
      )
  }
  
  GetAllEvents() {
    let API_URL = `${this.СareService.REST_API}/get-event`;
    return this.httpClient.get(API_URL);
  }

  SelectedEvent(id:any): Observable<any> {
    let API_URL = `${this.СareService.REST_API}/read-event/${id}`;
      return this.httpClient.get(API_URL, { headers: this.СareService.httpHeaders })
        .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.СareService.handleError)
      )
  }

  UpdateEmployee(id:any, event:any): Observable<any> {
    let API_URL = `${this.СareService.REST_API}/update-event/${id}`;
    return this.httpClient.put(API_URL, event, { headers: this.СareService.httpHeaders })
      .pipe(
        catchError(this.СareService.handleError)
      )
  }

  DeleteEvent(id:any): Observable<any> {
    let API_URL = `${this.СareService.REST_API}/delete-event/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.СareService.httpHeaders}).pipe(
        catchError(this.СareService.handleError)
      )
  }
}
