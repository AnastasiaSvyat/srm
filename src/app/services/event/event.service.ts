import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Events } from 'src/app/model/Events';
import { CareService } from '../care/care.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private httpClient: HttpClient,
    private careService: CareService) { }


  AddEvent(data: Events): Observable<Events> {
    const API_URL = `${this.careService.REST_API}/add-event`;
    return this.httpClient.post<Events>(API_URL, data)
      .pipe(
        catchError(this.careService.handleError)
      );
  }

  GetEventsLater(): Observable<Events[]> {
    const API_URL = `${this.careService.REST_API}/getEvent-Later`;
    return this.httpClient.get<Events[]>(API_URL);
  }

  GetSelectEvents(selectDate: any): Observable<Events[]> {
    selectDate = moment(selectDate).format('YYYY-MM-DD');
    const API_URL = `${this.careService.REST_API}/getEvent-Select/?date=${selectDate}`;
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

  UpdateEvent(id: string, event: Events): Observable<Events> {
    const API_URL = `${this.careService.REST_API}/update-event/${id}`;
    return this.httpClient.put<Events>(API_URL, event, { headers: this.careService.httpHeaders })
      .pipe(
        catchError(this.careService.handleError)
      );
  }

  DeleteEvent(id: string): Observable<Event> {
    const API_URL = `${this.careService.REST_API}/delete-event/${id}`;
    return this.httpClient.delete<Event>(API_URL, { headers: this.careService.httpHeaders }).pipe(
      catchError(this.careService.handleError)
    );
  }
}
