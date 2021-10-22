import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Request } from 'src/app/model/Request';
import { CareService } from '../care/care.service';
// import { CareService } from '../care/care.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

constructor(private httpClient: HttpClient,public СareService: CareService) { }

 AddRequest(data:Request): Observable<any> {
    let API_URL = `${this.СareService.REST_API}/add-request`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.СareService.handleError)
      )
  }
  
  
  GetAllRequest() {
    let API_URL = `${this.СareService.REST_API}/get-request/?confirm=false&decline=false`;
      return this.httpClient.get(API_URL)
      .pipe(map((res: any) => {
        return res || {}
      }),
      catchError(this.СareService.handleError)
    )
  }

  SelectedRequest(id:any): Observable<any> {
    let API_URL = `${this.СareService.REST_API}/read-request/${id}`;
      return this.httpClient.get(API_URL, { headers: this.СareService.httpHeaders })
        .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.СareService.handleError)
      )
  }
 
  ConfirmRequest(): Observable<any> {
    return this.httpClient.get(`${this.СareService.REST_API}/true-request/?confirm=true`)
        .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.СareService.handleError)
      )
  }

  DeclineRequest(): Observable<any> {
    return this.httpClient.get(`${this.СareService.REST_API}/false-request/?decline=true`)
      .pipe(map((res: any) => {
        return res || {}
      }),
      catchError(this.СareService.handleError)
    )
  }

  UpdateRequest(id:any, event:any): Observable<any> {
    let API_URL = `${this.СareService.REST_API}/update-request/${id}`;
      return this.httpClient.put(API_URL, event, { headers: this.СareService.httpHeaders })
        .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.СareService.handleError)
      )
  }

  DeleteRequest(id:any): Observable<any> {
    let API_URL = `${this.СareService.REST_API}/delete-request/${id}`;
      return this.httpClient.delete(API_URL, { headers: this.СareService.httpHeaders})
      .pipe(map((res: any) => {
        return res || {}
      }),
      catchError(this.СareService.handleError)
    )
  }
}
