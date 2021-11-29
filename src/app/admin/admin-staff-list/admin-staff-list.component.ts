import { Component, OnInit } from '@angular/core';
import { AddUserComponent } from '../add-user/add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { SearchName } from 'src/app/model/SearchName';
import { Employee } from 'src/app/model/Employee';
import { UploadFileService } from 'src/app/services/UploadFile/upload-file.service';
import { DataEmployeeService } from 'src/app/services/dataEmployee/dataEmployee.service';
import { UploadPhotoService } from 'src/app/services/uploadPhoto/upload-photo.service';
import { UploadPhoto } from 'src/app/model/UploadPhoto';
import { UploadFile } from 'src/app/model/UploadFile';


@Component({
  selector: 'app-admin-staff-list',
  templateUrl: './admin-staff-list.component.html',
  styleUrls: ['./admin-staff-list.component.scss']
})
export class AdminStaffListComponent implements OnInit {

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog,
    public uplFileService: UploadFileService,
    public uloadPhotoService: UploadPhotoService,
    public service: DataEmployeeService) { }

  staffList: Employee[] = [];
  currentEmployee: SearchName = {};
  currentIndex = -1;
  searchByName!: any;
  updateUser!: any;
  employee: Employee[] = [];
  dataAddEmloyee!: Employee;
  dataPhotoUpload!: UploadPhoto;
  urlPhoto!: string;
  dataCVUpload!: UploadFile;

  page = 1;
  count = 0;
  pageSize = 10;

  displayedColumns: string[] = ['name', 'position', 'birthday', 'salary', 'firstDay', 'lastPerf', 'phone', 'email', 'cv', 'change'];

  ngOnInit(): void {
    this.service.data.subscribe(res => {
      this.employee = res;
    });
    this.retrieveStaff();
  }

  getRequestParams(searchName: string, page: number, pageSize: number): any {
    const params: any = {};
    if (searchName) {
      params[`name`] = searchName;
    }
    if (page) {
      params[`page`] = page - 1;
    }
    if (pageSize) {
      params[`size`] = pageSize;
    }
    return params;
  }

  // getPhotoEmployee() {
  //   console.log(this.dataAddEmloyee);
  //   this.uloadPhotoService.GetPhotoByEmail(this.updateUser)
  //     .subscribe((res) => {
  //       if (res.length) {
  //         this.urlPhoto = res[0].imagePath;
  //       }
  //     });
  // }

  retrieveStaff(): void {
    const params = this.getRequestParams(this.searchByName, this.page, this.pageSize);
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

  addUser(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '398px',
      height: '984px',
      data: {
        head: 'Add user:',
        btn: 'ADD',
        showArhiveUser: false,
        addCV: 'Add CV',
        changeUser: '',
        showRole: true,
        showCV: true,
        showPassword: true,
        showLastPerf: false,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataAddEmloyee = result[0];
        this.dataPhotoUpload = result[1];
        this.dataCVUpload = result[2];
        this.employeeService.AddEmployee(this.dataAddEmloyee)
          .subscribe((res) => {
            this.retrieveStaff();
          });
        if (this.dataPhotoUpload.image != null) {
          this.uloadPhotoService.uploadPhoto(this.dataPhotoUpload.name, this.dataPhotoUpload.image, this.updateUser.email)
            .subscribe(success => {
              // this.getPhotoEmployee();
            },
              error => console.log(error));
        }
        if (this.dataCVUpload.cv != null) {
          this.uplFileService.uploadFile(this.dataCVUpload.name, this.dataCVUpload.cv, this.updateUser.email)
            .subscribe((res: any) => {
              console.log(res);
            });
        }
      }
    });
  }

  editUser(event: any): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '398px',
      height: '984px',
      data: {
        head: 'Edit user:',
        btn: 'SAVE',
        changeUser: event,
        showArhiveUser: true,
        addCV: 'Add new CV',
        showPassword: false,
        showRole: false,
        showLastPerf: true,
        showCV: true
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateUser = result[0];
        this.dataPhotoUpload = result[1];
        this.dataCVUpload = result[2];
        this.employeeService.updateEmployee(event.id, this.updateUser)
          .subscribe(
            success => {
              this.employeeService.GetEmployee(event.id)
                .subscribe((res) => {
                  console.log(res);
                });
            },
            error => console.log(error));
        if (this.dataPhotoUpload.image != null) {
          this.uloadPhotoService.uploadPhoto(this.dataPhotoUpload.name, this.dataPhotoUpload.image, this.updateUser.email)
            .subscribe(success => {
              // this.getPhotoEmployee();
            },
              error => console.log(error));
        }
        if (this.dataCVUpload.cv != null) {
          this.uplFileService.uploadFile(this.dataCVUpload.name, this.dataCVUpload.cv, this.updateUser.email)
            .subscribe((res: any) => {
              console.log(res);
            });
        }
      }
    });
  }

  searchName(): void {
    this.page = 1;
    this.retrieveStaff();
  }
}










