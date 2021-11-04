import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CareService } from '../care/care.service';
@Injectable({
  providedIn: 'root'
})

export class UploadFileService {

constructor(private httpClient: HttpClient, private careService: CareService) { }

getUplFileByEmail(email: string): Observable<any> {
  const API_URL = `${this.careService.REST_API}/get-uplFile/?email=${email}`;
  return this.httpClient.get(API_URL);
}

  uploadFile( employee: any, file: File): Observable<any> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('name', file.name);
  formData.append('email', employee.email);
  const API_URL = `${this.careService.REST_API}/uplFile`;
  return this.httpClient.post(API_URL, formData)
      .pipe(
        catchError(this.careService.handleError)
      );
  }

  deleteUplFile(id: any): Observable<any> {
    const API_URL = `${this.careService.REST_API}/delete-cv/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.careService.httpHeaders}).pipe(
        catchError(this.careService.handleError)
      );
  }
}
