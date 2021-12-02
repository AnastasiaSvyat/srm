import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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

  getUplFileById(employee: Employee): Observable<UploadFile[]> {
    const API_URL = `${this.careService.REST_API}/getCVFileById/?idEmployee=${employee.id}`;
    return this.httpClient.get<UploadFile[]>(API_URL);
  }

  uploadFile(name: string, cv: File, employee: Employee): Observable<UploadFile[]> {
    const formData = new FormData();
    formData.append('cv', cv, name);
    formData.append('name', name);
    formData.append('idEmployee', employee.id);
    const API_URL = `${this.careService.REST_API}/uplFile?idEmployee=${employee.id}`;
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
}
