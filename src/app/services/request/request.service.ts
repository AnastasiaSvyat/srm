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

constructor(private httpClient: HttpClient,private careService: CareService) { }

 AddRequest(data:Request): Observable<any> {
    let API_URL = `${this.careService.REST_API}/add-request`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.careService.handleError)
      )
  }
  
  
  GetAllRequest() {
    let API_URL = `${this.careService.REST_API}/get-request/?confirm=false&decline=false`;
      return this.httpClient.get(API_URL)
      .pipe(map((res: any) => {
        return res || {}
      }),
      catchError(this.careService.handleError)
    )
  }

  SelectedRequest(id:any): Observable<any> {
    let API_URL = `${this.careService.REST_API}/read-request/${id}`;
      return this.httpClient.get(API_URL, { headers: this.careService.httpHeaders })
        .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.careService.handleError)
      )
  }
 
  ConfirmRequest(): Observable<any> {
    return this.httpClient.get(`${this.careService.REST_API}/true-request/?confirm=true`)
        .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.careService.handleError)
      )
  }

  DeclineRequest(): Observable<any> {
    return this.httpClient.get(`${this.careService.REST_API}/false-request/?decline=true`)
      .pipe(map((res: any) => {
        return res || {}
      }),
      catchError(this.careService.handleError)
    )
  }

  UpdateRequest(id:any, event:any): Observable<any> {
    let API_URL = `${this.careService.REST_API}/update-request/${id}`;
      return this.httpClient.put(API_URL, event, { headers: this.careService.httpHeaders })
        .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.careService.handleError)
      )
  }

  DeleteRequest(id:any): Observable<any> {
    let API_URL = `${this.careService.REST_API}/delete-request/${id}`;
      return this.httpClient.delete(API_URL, { headers: this.careService.httpHeaders})
      .pipe(map((res: any) => {
        return res || {}
      }),
      catchError(this.careService.handleError)
    )
  }
}
