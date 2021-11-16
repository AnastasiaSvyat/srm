import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Employee } from 'src/app/model/Employee';
import { UploadFile } from 'src/app/model/UploadFile';
import { CareService } from '../care/care.service';

@Injectable({
  providedIn: 'root'
})

export class UploadFileService {

  constructor(
    private httpClient: HttpClient,
    private careService: CareService) { }

  getUplFileByEmail(employee: Employee): Observable<UploadFile[]> {
    const API_URL = `${this.careService.REST_API}/get-uplFile/?email=${employee.email}`;
    return this.httpClient.get<UploadFile[]>(API_URL);
  }

  uploadFile(employee: Employee, file: File): Observable<UploadFile[]> {
    console.log(file);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', file.name);
    formData.append('email', employee.email);
    console.log(formData);
    console.log(file);
    const API_URL = `${this.careService.REST_API}/uplFile?email=${employee.email}`;
    return this.httpClient.post<UploadFile[]>(API_URL, formData)
      .pipe(
        catchError(this.careService.handleError)
      );
  }

  deleteUplFile(id: any): Observable<UploadFile> {
    const API_URL = `${this.careService.REST_API}/delete-cv/${id}`;
    return this.httpClient.delete<UploadFile>(API_URL, { headers: this.careService.httpHeaders }).pipe(
      catchError(this.careService.handleError)
    );
  }

  getFiles(): Observable<any> {
    return this.httpClient.get(`${this.careService.REST_API}/fil`);
  }
}
