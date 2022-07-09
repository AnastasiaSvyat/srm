import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LogTime } from 'src/app/model/logTime';
import { CareService } from '../care/care.service';

@Injectable({
  providedIn: 'root'
})
export class LogTimeService {

  constructor(
    private httpClient: HttpClient,
    private careService: CareService
    ) { }

  LogTime(data: LogTime): Observable<LogTime> {
    const API_URL = `${this.careService.REST_API}/logTime`;
    return this.httpClient.post<LogTime>(API_URL, data)
      .pipe(
        catchError(this.careService.handleError)
      );
  }

  LogTimeByEmployeeId(employeeId: number | string): Observable<LogTime[]> {
    const API_URL = `${this.careService.REST_API}/logTimeById/?idEmployee=${employeeId}`;
    return this.httpClient.get<LogTime[]>(API_URL)
      .pipe(map((res: any) => {
        return res || {};
      }),
        catchError(this.careService.handleError)
      );
  }

  UpdateLogTime(id: string, data: LogTime): Observable<LogTime> {
    const API_URL = `${this.careService.REST_API}/update-logTime/${id}`;
    return this.httpClient.put<LogTime>(API_URL, data, { headers: this.careService.httpHeaders })
      .pipe(
        catchError(this.careService.handleError)
      );
  }

  currentMonthRequestLogTime(selectMonthAndYear: string): Observable<LogTime[]> {
    const API_URL = `${this.careService.REST_API}/getLogTimeCurrentMonth`;
    return this.httpClient.get<LogTime[]>(API_URL, { params: { selectMonthAndYear: selectMonthAndYear } })
      .pipe(map((res: any) => {
        return res || {};
      }),
        catchError(this.careService.handleError)
      );
  }

  getCurrentMonthRequestSelectEmployeeLogTime(selectMonthAndYear: string, employeeId: string | number): Observable<LogTime> {
    const API_URL = `${this.careService.REST_API}/getLogTimeSelectEmployeeCurrentMonth?idEmployee=${employeeId}`;
    return this.httpClient.get<LogTime>(API_URL, { params: { selectMonthAndYear: selectMonthAndYear} })
      .pipe(map((res: any) => {
        return res || {};
      }),
        catchError(this.careService.handleError)
      );
  }

}
