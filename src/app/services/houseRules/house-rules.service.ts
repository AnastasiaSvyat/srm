import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UploadFile } from 'src/app/model/UploadFile';
import { CareService } from '../care/care.service';

@Injectable({
  providedIn: 'root'
})
export class HouseRulesService {

  constructor(
    private httpClient: HttpClient,
    private careService: CareService) { }

    getHouseRules(): Observable<any> {
    const API_URL = `${this.careService.REST_API}/getHouseRules`;
    return this.httpClient.get<any>(API_URL);
  }

  uploadHouseRules(houseRules: File): Observable<any[]> {
    const formData = new FormData();
    formData.append('houseRules', houseRules);
    const API_URL = `${this.careService.REST_API}/uploadHouseRules`;
    return this.httpClient.post<any[]>(API_URL, formData)
      .pipe(
        catchError(this.careService.handleError)
      );
  }

  deleteHouseRules(id: string): Observable<UploadFile> {
    const API_URL = `${this.careService.REST_API}/deleteHouseRules/${id}`;
    return this.httpClient.delete<UploadFile>(API_URL, { headers: this.careService.httpHeaders }).pipe(
      catchError(this.careService.handleError)
    );
  }
}