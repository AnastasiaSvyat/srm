import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RequestHelper } from 'src/app/helpers/requestHelper';
import { Employee } from 'src/app/model/Employee';
import { Request } from 'src/app/model/Request';
import { CareService } from '../care/care.service';

@Injectable({
  providedIn: 'root'
})

export class RequestService {

  type!: any;

  constructor(
    private httpClient: HttpClient,
    private careService: CareService) { }

  AddRequest(data: Request): Observable<Request> {
    const API_URL = `${this.careService.REST_API}/add-request`;
    return this.httpClient.post<Request>(API_URL, data)
      .pipe(
        catchError(this.careService.handleError)
      );
  }

  GetPendingRequest(): Observable<Request[]> {
    const API_URL = `${this.careService.REST_API}/get-request`;
    return this.httpClient.get<Request[]>(API_URL, { params: { confirm: 'false', decline: 'false' } })
      .pipe(map((res: any) => {
        return res || {};
      }),
        catchError(this.careService.handleError)
      );
  }

  GetPendingRequestById(employee: Employee): Observable<Request[]> {
    const API_URL = `${this.careService.REST_API}/get-reqById/?idEmployee=${employee.id}`;
    return this.httpClient.get<Request[]>(API_URL, { params: { confirm: 'false', decline: 'false' } })
      .pipe(map((res: any) => {
        return res || {};
      }),
        catchError(this.careService.handleError)
      );
  }

  ConfirmRequest(): Observable<Request[]> {
    const API_URL = `${this.careService.REST_API}/true-request`;
    return this.httpClient.get<Request[]>(API_URL, { params: { confirm: 'true' } })
      .pipe(map((res: any) => {
        return res || {};
      }),
        catchError(this.careService.handleError)
      );
  }

  ConfirmRequestVacation(id: number): Observable<Request[]> {
      this.type = RequestHelper[id]
    const API_URL = `${this.careService.REST_API}/true-request-vacation`;
    return this.httpClient.get<Request[]>(API_URL, { params: { confirm: 'true', type: this.type } })
      .pipe(map((res: any) => {
        return res || {};
      }),
        catchError(this.careService.handleError)
      );
  }

  GetRequestConfirmMonth(): Observable<Request[]> {
    const API_URL = `${this.careService.REST_API}/trueRequest-month`;
    return this.httpClient.get<Request[]>(API_URL, { params: { confirm: 'true' } });
  }

  GetRequestConfirmLater(): Observable<Request[]> {
    const API_URL = `${this.careService.REST_API}/trueRequest-Later`;
    return this.httpClient.get<Request[]>(API_URL, { params: { confirm: 'true' } });
  }

  DeclineRequest(): Observable<Request[]> {
    const API_URL = `${this.careService.REST_API}/false-request`;
    return this.httpClient.get<Request[]>(API_URL, { params: { decline: 'true' } })
      .pipe(map((res: any) => {
        return res || {};
      }),
        catchError(this.careService.handleError)
      );
  }

  ConfirmRequestByIdLater(employee: Employee): Observable<Request[]> {
    const API_URL = `${this.careService.REST_API}/trueRequestEmployee-Later/?idEmployee=${employee.id}`;
    return this.httpClient.get<Request[]>(API_URL, { params: { confirm: 'true' } })
      .pipe(map((res: any) => {
        return res || {};
      }),
        catchError(this.careService.handleError)
      );
  }

  ConfirmRequestById(employeeId: number | string): Observable<Request[]> {
    const API_URL = `${this.careService.REST_API}/trueRequest-monthbyId/?idEmployee=${employeeId}`;
    return this.httpClient.get<Request[]>(API_URL, { params: { confirm: 'true' } })
      .pipe(map((res: any) => {
        return res || {};
      }),
        catchError(this.careService.handleError)
      );
  }

  DeclineRequestById(employee: Employee): Observable<Request[]> {
    const API_URL = `${this.careService.REST_API}/false-reqById/?idEmployee=${employee.id}`;
    return this.httpClient.get<Request[]>(API_URL, { params: { decline: 'true' } })
      .pipe(map((res: any) => {
        return res || {};
      }),
        catchError(this.careService.handleError)
      );
  }

  UpdateRequest(id: string, event: Event): Observable<Request[]> {
    const API_URL = `${this.careService.REST_API}/update-request/${id}`;
    return this.httpClient.put<Request[]>(API_URL, event, { headers: this.careService.httpHeaders })
      .pipe(map((res: any) => {
        return res || {};
      }),
        catchError(this.careService.handleError)
      );
  }

  DeleteRequest(id: string): Observable<Request[]> {
    const API_URL = `${this.careService.REST_API}/delete-request/${id}`;
    return this.httpClient.delete<Request[]>(API_URL, { headers: this.careService.httpHeaders }).pipe(
      catchError(this.careService.handleError)
    );
  }
}
