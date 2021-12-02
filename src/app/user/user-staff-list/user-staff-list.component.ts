import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/Employee';
import { SearchName } from 'src/app/model/SearchName';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { UploadPhotoService } from 'src/app/services/uploadPhoto/upload-photo.service';
import { UploadPhoto } from 'src/app/model/UploadPhoto';


@Component({
  selector: 'app-user-staff-list',
  templateUrl: './user-staff-list.component.html',
  styleUrls: ['./user-staff-list.component.scss']
})

export class UserStaffListComponent implements OnInit {

  constructor(
    private employeeService: EmployeeService,
    private uloadPhotoService: UploadPhotoService,
    public dialog: MatDialog) { }

  staffList: Employee[] = [];
  currentEmployee: SearchName = {};
  photoEmployee: UploadPhoto[] = [];
  name = '';
  currentIndex = -1;
  page = 1;
  count = 0;
  pageSize = 10;

  displayedColumns: string[] = ['name', 'position', 'birthday', 'phone', 'email', 'skype'];

  ngOnInit(): void {
    this.retrieveStaff();
    this.getPhotoEmployee();
  }

  getPhotoEmployee() {
    this.uloadPhotoService.GetPhoto()
      .subscribe((res) => {
        this.photoEmployee = res;
      });
  }

  getRequestParams(page: number, pageSize: number): any {
    const params: any = {};
    if (page) {
      params[`page`] = page - 1;
    }
    if (pageSize) {
      params[`size`] = pageSize;
    }
    return params;
  }

  retrieveStaff(): void {
    const params = this.getRequestParams(this.page, this.pageSize);
    this.employeeService.getStaffListPagination(params)
      .subscribe(
        response => {
          const { staffList, totalItems } = response;
          this.staffList = staffList;
          this.count = totalItems;
        },
        error => {
          console.log(error);
        });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveStaff();
  }

  setActiveEmployee(employee: Employee, index: number): void {
    this.currentEmployee = employee;
    this.currentIndex = index;
  }
}
