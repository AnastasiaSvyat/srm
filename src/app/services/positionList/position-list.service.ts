import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PositionList } from 'src/app/model/positionList';
import { CareService } from '../care/care.service';

@Injectable({
  providedIn: 'root'
})
export class PositionListService {

  constructor(
    private httpClient: HttpClient,
    private careService: CareService) { }


  CreatePosition(positionList: PositionList): Observable<PositionList> {
    const API_URL = `${this.careService.REST_API}/createPosition`;
    return this.httpClient.post<PositionList>(API_URL, positionList)
      .pipe(
        catchError(this.careService.handleError)
      );
  }

  UpdatePosition(positionList: PositionList): Observable<PositionList> {
    const API_URL = `${this.careService.REST_API}/updatePosition/${positionList._id}`;
    return this.httpClient.put<PositionList>(API_URL, positionList, { headers: this.careService.httpHeaders })
      .pipe(
        catchError(this.careService.handleError)
      );
  }

  GetPositionList(): Observable<PositionList[]> {
    const API_URL = `${this.careService.REST_API}/getAllPositions`;
    return this.httpClient.get<PositionList[]>(API_URL)
      .pipe(
        catchError(this.careService.handleError)
      );
  }

  GetPositionById(id: string): Observable<PositionList> {
    const API_URL = `${this.careService.REST_API}/getPositionById/${id}`;
    return this.httpClient.get<PositionList>(API_URL)
      .pipe(
        catchError(this.careService.handleError)
      );
  }

  DeletePosition(id: string): Observable<PositionList> {
    const API_URL = `${this.careService.REST_API}/deletePosition/${id}`;
    return this.httpClient.delete<PositionList>(API_URL, { headers: this.careService.httpHeaders }).pipe(
      catchError(this.careService.handleError)
    );
  }
}

