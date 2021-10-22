import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UploadFile } from 'src/app/model/UploadFile';
@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private httpClient: HttpClient) { }
  REST_API: string = 'http://localhost:8000/api';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');


  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
  
  getGalleryById(email: string): Observable<any> {
    let API_URL = `${this.REST_API}/get-uplFile/?email=${email}`;
      return this.httpClient.get(API_URL);
  }

  uploadFile( employee:any,file: File): Observable<any> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('name', file.name);
  formData.append('email', employee.email);
    let API_URL = `${this.REST_API}/uplFile`;
    return this.httpClient.post(API_URL, formData)
      .pipe(
        catchError(this.handleError)
      )
  }
  
  deleteUplFile(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-cv/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders}).pipe(
        catchError(this.handleError)
      )
  }
}
