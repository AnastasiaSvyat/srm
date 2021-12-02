import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Employee } from 'src/app/model/Employee';
import { UploadPhoto } from 'src/app/model/UploadPhoto';
import { CareService } from '../care/care.service';

@Injectable({
  providedIn: 'root'
})
export class UploadPhotoService {

  constructor(
    private httpClient: HttpClient,
    private careService: CareService) { }

  uploadPhoto(name: string, image: File, employee: Employee): Observable<UploadPhoto[]> {
    const API_URL = `${this.careService.REST_API}/uploadPhoto`;
    const profileData = new FormData();
    profileData.append('name', name);
    profileData.append('image', image, name);
    profileData.append('idEmployee', employee.id);
    return this.httpClient.post<UploadPhoto[]>(API_URL, profileData)
      .pipe(
        catchError(this.careService.handleError)
      );
  }

  GetPhotoById(employee: Employee): Observable<UploadPhoto[]> {
    const API_URL = `${this.careService.REST_API}/getPhotoEmployeeById/?idEmployee=${employee.id}`;
    return this.httpClient.get<UploadPhoto[]>(API_URL);
  }

  GetPhoto(): Observable<UploadPhoto[]> {
    const API_URL = `${this.careService.REST_API}/getPhoto`;
    return this.httpClient.get<UploadPhoto[]>(API_URL);
  }

}
