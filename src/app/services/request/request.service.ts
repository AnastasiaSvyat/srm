import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Request } from 'src/app/model/Request';
import { CareService } from '../care/care.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private httpClient: HttpClient,
    private careService: CareService) { }

  AddRequest(data: Request): Observable<Request[]> {
    const API_URL = `${this.careService.REST_API}/add-request`;
    return this.httpClient.post<Request[]>(API_URL, data)
      .pipe(
        catchError(this.careService.handleError)
      );
  }


  GetAllRequest(): Observable<Request[]> {
    const API_URL = `${this.careService.REST_API}/get-request/?confirm=false&decline=false`;
    return this.httpClient.get<Request[]>(API_URL)
      .pipe(map((res: any) => {
        return res || {};
      }),
        catchError(this.careService.handleError)
      );
  }

  GetAllRequestEmail(email: string): Observable<Request[]> {
    const API_URL = `${this.careService.REST_API}/get-reqEmail/?confirm=false&decline=false&email=${email}`;
    return this.httpClient.get<Request[]>(API_URL)
      .pipe(map((res: any) => {
        return res || {};
      }),
        catchError(this.careService.handleError)
      );
  }

  SelectedRequest(id: any): Observable<Request[]> {
    const API_URL = `${this.careService.REST_API}/read-request/${id}`;
    return this.httpClient.get<Request[]>(API_URL, { headers: this.careService.httpHeaders })
      .pipe(map((res: any) => {
        return res || {};
      }),
        catchError(this.careService.handleError)
      );
  }

  ConfirmRequest(): Observable<Request[]> {
    return this.httpClient.get<Request[]>(`${this.careService.REST_API}/true-request/?confirm=true`)
      .pipe(map((res: any) => {
        return res || {};
      }),
        catchError(this.careService.handleError)
      );
  }

  GetRequestConfirmMonth(): Observable<Request[]> {
    const API_URL = `${this.careService.REST_API}/trueRequest-month/?confirm=true`;
    console.log(API_URL);

    return this.httpClient.get<Request[]>(API_URL);
  }

  GetRequestConfirmLater(): Observable<Request[]> {
    const API_URL = `${this.careService.REST_API}/trueRequest-Later/?confirm=true`;
    console.log(API_URL);

    return this.httpClient.get<Request[]>(API_URL);
  }

  DeclineRequest(): Observable<Request[]> {
    return this.httpClient.get<Request[]>(`${this.careService.REST_API}/false-request/?decline=true`)
      .pipe(map((res: any) => {
        return res || {};
      }),
        catchError(this.careService.handleError)
      );
  }

  ConfirmRequestByEmil(employee: any): Observable<Request[]> {
    return this.httpClient.get<Request[]>(`${this.careService.REST_API}/true-reqEmail/?confirm=true&email=${employee.email}`)
      .pipe(map((res: any) => {
        return res || {};
      }),
        catchError(this.careService.handleError)
      );
  }

  ConfirmRequestByEmilLater(employee: any): Observable<Request[]> {
    return this.httpClient.get<Request[]>(`${this.careService.REST_API}/trueRequestEmployee-Later/?confirm=true&email=${employee.email}`)
      .pipe(map((res: any) => {
        return res || {};
      }),
        catchError(this.careService.handleError)
      );
  }

  DeclineRequestByEmail(email: any): Observable<Request[]> {
    return this.httpClient.get<Request[]>(`${this.careService.REST_API}/false-reqEmail/?decline=true&email=${email}`)
      .pipe(map((res: any) => {
        return res || {};
      }),
        catchError(this.careService.handleError)
      );
  }

  UpdateRequest(id: any, event: any): Observable<Request[]> {
    const API_URL = `${this.careService.REST_API}/update-request/${id}`;
    return this.httpClient.put<Request[]>(API_URL, event, { headers: this.careService.httpHeaders })
      .pipe(map((res: any) => {
        return res || {};
      }),
        catchError(this.careService.handleError)
      );
  }

  DeleteRequest(id: any): Observable<Request[]> {
    const API_URL = `${this.careService.REST_API}/delete-request/${id}`;
    return this.httpClient.delete<Request[]>(API_URL, { headers: this.careService.httpHeaders }).pipe(
      catchError(this.careService.handleError)
    );
  }
}
