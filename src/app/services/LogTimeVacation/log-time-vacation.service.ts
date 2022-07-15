import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LogTimeVacation } from 'src/app/model/logTimeVacation';
import { CareService } from '../care/care.service';
import * as moment from 'moment';
import { LogTimeVacationInNewYer } from 'src/app/model/LogTimeVacationInNewYear';
import { LogTimeDecline } from 'src/app/model/LogTimeDecline';


@Injectable({
  providedIn: 'root'
})
export class LogTimeVacationService {

  year = moment().format('yyyy');


  constructor(
    private httpClient: HttpClient,
    private careService: CareService
  ) { }


  CreateNewCounterUpdateDate(data: any, startDate: string): Observable<any> {
    const API_URL = `${this.careService.REST_API}/createNewCounterUpdateDate/?idEmployee=${data.idEmployee}&date=${startDate}`;
    return this.httpClient.post<any>(API_URL, data)
      .pipe(
        catchError(this.careService.handleError)
      );
  }

  LogTimeVacation(data: LogTimeVacation): Observable<LogTimeVacation> {
    const API_URL = `${this.careService.REST_API}/createLogTimeVacation`;
    return this.httpClient.post<LogTimeVacation>(API_URL, data)
      .pipe(
        catchError(this.careService.handleError)
      );
  }

  LogTimeVacationInNewYear(data: LogTimeVacationInNewYer): Observable<LogTimeVacationInNewYer> {
    const API_URL = `${this.careService.REST_API}/createLogTimeVacationInNewYear`;
    return this.httpClient.post<LogTimeVacationInNewYer>(API_URL, data)
      .pipe(
        catchError(this.careService.handleError)
      );
  }

  GetLogTimeVacationEmployeeId(employeeId: string): Observable<any> {
    const API_URL = `${this.careService.REST_API}/updateDate-logTimeVacation/?idEmployee=${employeeId}`;
    return this.httpClient.get<any>(API_URL);
  }

  GetCurrentRequest(): Observable<LogTimeVacationInNewYer[]> {
    const API_URL = `${this.careService.REST_API}/currentRequest`;
    return this.httpClient.get<LogTimeVacationInNewYer[]>(API_URL);
  }

  GetLogTimeVacationEmployeeThisYear(employeeId: string): Observable<any> {
    const API_URL = `${this.careService.REST_API}/logTimeVacationThisYear/?idEmployee=${employeeId}`;
    return this.httpClient.get<any>(API_URL, { params: { year: this.year } });
  }

  UpdateLogTimeVacationById(id: string, logTimeVacation: any): Observable<any> {
    const API_URL = `${this.careService.REST_API}/updateDate-logTimeVacationById/${id}`;
    return this.httpClient.put<any>(API_URL, logTimeVacation, { headers: this.careService.httpHeaders })
      .pipe(
        catchError(this.careService.handleError)
      );
  }

  CheckPassedYearSinceFirstDate(request: any ): Observable<any> {
    const API_URL = `${this.careService.REST_API}/checkPassedYearSinceFirstDate/?idEmployee=${request.idEmployee}&date=${request.date}&endDate=${request.endDate}`;
    return this.httpClient.put<any>(API_URL, { headers: this.careService.httpHeaders },)
      .pipe(
        catchError(this.careService.handleError)
      );
  }

  

  checkCorrectUpdateDateOrCreateLogTimeVacation(idEmployee: string | number ): Observable<any> {
    const API_URL = `${this.careService.REST_API}/checkCorrectUpdateDateOrCreateLogTimeVacation/?idEmployee=${idEmployee}`;
    return this.httpClient.put<any>(API_URL, { headers: this.careService.httpHeaders },)
      .pipe(
        catchError(this.careService.handleError)
      );
  }

  UpdateLogTimeCurrentVacationById(currentRequest: any, request: any ): Observable<any> {
    const API_URL = `${this.careService.REST_API}/currentRequestByEmployeeId/?idEmployee=${currentRequest.idEmployee}&date=${request.date}&endDate=${request.endDate}`;
    return this.httpClient.put<any>(API_URL, currentRequest, { headers: this.careService.httpHeaders },)
      .pipe(
        catchError(this.careService.handleError)
      );
  }

  currentRequestByEmployeeIdStartDateAndEndDateNotSuitable(currentRequest: any, request: any ): Observable<any> {
    const API_URL = `${this.careService.REST_API}/currentRequestByEmployeeIdStartDateAndEndDateNotSuitable/?idEmployee=${currentRequest.idEmployee}&date=${request.date}&endDate=${request.endDate}&request=${request}`;
    return this.httpClient.put<any>(API_URL, currentRequest, { headers: this.careService.httpHeaders },)
      .pipe(
        catchError(this.careService.handleError)
      );
  }
  

  UpdateDeclineLogTimeCurrentVacationById(currentRequest: LogTimeDecline): Observable<any> {
    const API_URL = `${this.careService.REST_API}/declineCurrentRequestByEmployeeId/?idEmployee=${currentRequest.idEmployee}`;
    return this.httpClient.put<any>(API_URL, currentRequest, { headers: this.careService.httpHeaders })
      .pipe(
        catchError(this.careService.handleError)
      );
  }

  UpdateCountVacation(id: string, logTimeVacation: LogTimeVacation): Observable<LogTimeVacation> {
    const API_URL = `${this.careService.REST_API}/updateDateVacation/${id}`;
    return this.httpClient.put<LogTimeVacation>(API_URL, logTimeVacation, { headers: this.careService.httpHeaders })
      .pipe(
        catchError(this.careService.handleError)
      );
  }

}
