import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../../model/Employee';
import { CareService } from '../care/care.service';
import * as moment from 'moment';
import { ParamsStaffPag } from 'src/app/admin/admin-staff-list/admin-staff-list.component';
import { NewPassword } from 'src/app/model/NewPassword';

interface StaffListDto {
  totalItems: number;
  staffList: Employee[];
  totalPages: number;
  currentPage: number;
  data: object;
}

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor(
    private httpClient: HttpClient,
    private careService: CareService) { }

  AddEmployee(employee: Employee): Observable<Employee> {
    const API_URL = `${this.careService.REST_API}/add-employee`;
    return this.httpClient.post<Employee>(API_URL, employee)
      .pipe(
        catchError(this.careService.handleError)
      );

  }

  GetStaff(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.careService.REST_API}`);
  }


  GetEmployee(id: string): Observable<Employee> {
    const API_URL = `${this.careService.REST_API}/read-employee/${id}`;
    return this.httpClient.get(API_URL, { headers: this.careService.httpHeaders })
      .pipe(map((res: any) => {
        return res || {};
      }),
        catchError(this.careService.handleError)
      );
  }

  GetSelectBirth(selectDate: any): Observable<Employee[]> {
    selectDate = moment(selectDate).format('MM-DD');
    const API_URL = `${this.careService.REST_API}/getBirth-Select/?date=${selectDate}`;
    return this.httpClient.get<Employee[]>(API_URL);
  }

  updateEmployee(id: string, employee: Employee): Observable<Employee> {
    const API_URL = `${this.careService.REST_API}/update-employee/${id}`;
    return this.httpClient.put<Employee>(API_URL, employee, { headers: this.careService.httpHeaders })
      .pipe(
        catchError(this.careService.handleError)
      );
  }

  updatePassword(id: string, password: NewPassword): Observable<Employee> {
    const API_URL = `${this.careService.REST_API}/update-password/${id}`;
    return this.httpClient.put<Employee>(API_URL, password, { headers: this.careService.httpHeaders })
      .pipe(
        catchError(this.careService.handleError)
      );
  }

<<<<<<< HEAD
  GetEmplBirthLaterStart(): Observable<Employee[]> {
    const API_URL = `${this.careService.REST_API}/getEmpl-LaterStart`;
    return this.httpClient.get<Employee[]>(API_URL);
  }

  GetEmplBirthLaterEnd(): Observable<Employee[]> {
    const API_URL = `${this.careService.REST_API}/getEmpl-LaterEnd`;
=======
  GetEmplBirthLater(): Observable<Employee[]> {
    const API_URL = `${this.careService.REST_API}/getEmpl-Later`;
>>>>>>> d387566ec0979b27dffcb7e2bfa2d8adeff10191
    return this.httpClient.get<Employee[]>(API_URL);
  }

  GetEmplBirthToday(): Observable<Employee[]> {
    const API_URL = `${this.careService.REST_API}/getEmpl-Today`;
    return this.httpClient.get<Employee[]>(API_URL);
  }

  GetEmplBirthMonth(): Observable<Employee[]> {
    const API_URL = `${this.careService.REST_API}/getEmpl-Month`;
    return this.httpClient.get<Employee[]>(API_URL);
  }

  deleteEmployee(id: string): Observable<Employee> {
    const API_URL = `${this.careService.REST_API}/delete-employee/${id}`;
    return this.httpClient.delete<Employee>(API_URL, { headers: this.careService.httpHeaders }).pipe(
      catchError(this.careService.handleError)
    );
  }

  getStaffListPagination(params: any): Observable<StaffListDto> {
    const API_URL = `${this.careService.REST_API}/stafflist`;
    return this.httpClient.get<StaffListDto>(API_URL, { params });
  }

}
