import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AmountConfirmedRequestMonth } from 'src/app/model/amountConfirmedRequestMonth';
import { CareService } from '../care/care.service';

@Injectable({
  providedIn: 'root'
})
export class AmountConfirmedRequestMonthService {

  constructor(
    private httpClient: HttpClient,
    private careService: CareService) { }


  amountConfirmedRequestMonth(data: any): Observable<any> {
    const API_URL = `${this.careService.REST_API}/amountConfirmedRequestMonth`;
    return this.httpClient.post<any>(API_URL, data)
      .pipe(
        catchError(this.careService.handleError)
      );
  }


  // getRequestCurrentUser(emloyeeId: string, date: Date): Observable<AmountConfirmedRequestMonth> {
  //   const API_URL = `${this.careService.REST_API}/getRequestCurrentUser/?date=${date}&idEmployee=${emloyeeId}`;
  //   return this.httpClient.get<AmountConfirmedRequestMonth>(API_URL);
  // }

  getRequestCurrentUser(emloyeeId: string, date: string): Observable<any> {
    const API_URL = `${this.careService.REST_API}/getRequestCurrentUser/?date=${date}&idEmployee=${emloyeeId}`;
    return this.httpClient.get<any>(API_URL);
  }

}
