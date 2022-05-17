import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CareService } from '../care/care.service';
import { CountRequest } from 'src/app/model/countRequest';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountServiceService {

  constructor(
    private httpClient: HttpClient,
    private careService: CareService
  ) { 
  }

  daysRequest(data: CountRequest): Observable<CountRequest> {
    const API_URL = `${this.careService.REST_API}/countRequest`;
    return this.httpClient.post<CountRequest>(API_URL, data)
      .pipe(
        catchError(this.careService.handleError)
      );
  }

  currentMonthRequest(month: string): Observable<CountRequest[]> {
    const API_URL = `${this.careService.REST_API}/get-monthRequest`;
    return this.httpClient.get<CountRequest[]>(API_URL, { params: { month: month } })
      .pipe(map((res: any) => {
        return res || {};
      }),
        catchError(this.careService.handleError)
      );
  }

}
