import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StandartHours } from 'src/app/model/standartHours';
import { CareService } from '../care/care.service';

@Injectable({
  providedIn: 'root'
})
export class StandartHoursService {

  constructor(
    private httpClient: HttpClient,
    private careService: CareService
    ) { }

    AddStandartHours(data: StandartHours): Observable<StandartHours> {
      const API_URL = `${this.careService.REST_API}/add-standartHours`;
      return this.httpClient.post<StandartHours>(API_URL, data)
        .pipe(
          catchError(this.careService.handleError)
        );
    }

    UpdateStandartHours(id: string, data: StandartHours): Observable<StandartHours> {
      const API_URL = `${this.careService.REST_API}/update-standartHours/${id}`;
      return this.httpClient.put<StandartHours>(API_URL, data, { headers: this.careService.httpHeaders })
        .pipe(
          catchError(this.careService.handleError)
        );
    }

    getStandartHours(): Observable<StandartHours> {
      const API_URL = `${this.careService.REST_API}/getStandartHours`;
      return this.httpClient.get<StandartHours>(API_URL)
        .pipe(
          catchError(this.careService.handleError)
        );
    }
}
