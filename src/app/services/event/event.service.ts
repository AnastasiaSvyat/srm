import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Events } from 'src/app/model/Events';
import { CareService } from '../care/care.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private httpClient: HttpClient,
    private careService: CareService) { }


  AddEvent(data: Events): Observable<any> {
    const API_URL = `${this.careService.REST_API}/add-event`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.careService.handleError)
      );
  }

  GetEventsLater(): Observable<Events[]> {
    const API_URL = `${this.careService.REST_API}/getEvent-Later`;
    console.log(API_URL);
    return this.httpClient.get<Events[]>(API_URL);
  }

  GetAllEvents(): Observable<Events[]> {
    const API_URL = `${this.careService.REST_API}/getEvent`;
    console.log(API_URL);
    return this.httpClient.get<Events[]>(API_URL);
  }


  GetEventMonth(): Observable<Events[]> {
    const API_URL = `${this.careService.REST_API}/getEvent-month`;
    return this.httpClient.get<Events[]>(API_URL);
  }

  GetAllEventToday(): Observable<Events[]> {
    const API_URL = `${this.careService.REST_API}/getEvent-today`;
    return this.httpClient.get<Events[]>(API_URL);
  }

  SelectedEvent(id: any): Observable<any> {
    const API_URL = `${this.careService.REST_API}/read-event/${id}`;
    return this.httpClient.get(API_URL, { headers: this.careService.httpHeaders })
      .pipe(map((res: any) => {
        return res || {};
      }),
        catchError(this.careService.handleError)
      );
  }

  UpdateEmployee(id: any, event: any): Observable<any> {
    const API_URL = `${this.careService.REST_API}/update-event/${id}`;
    return this.httpClient.put(API_URL, event, { headers: this.careService.httpHeaders })
      .pipe(
        catchError(this.careService.handleError)
      );
  }

  DeleteEvent(id: any): Observable<any> {
    const API_URL = `${this.careService.REST_API}/delete-event/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.careService.httpHeaders }).pipe(
      catchError(this.careService.handleError)
    );
  }
}
