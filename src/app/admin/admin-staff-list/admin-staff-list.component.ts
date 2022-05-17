import { Component, OnInit, ViewChild } from '@angular/core';
import { AddUserComponent } from '../add-user/add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { Employee } from 'src/app/model/Employee';
import { UploadFileService } from 'src/app/services/UploadFile/upload-file.service';
import { UploadPhotoService } from 'src/app/services/uploadPhoto/upload-photo.service';
import { UploadPhoto } from 'src/app/model/UploadPhoto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Overlay } from '@angular/cdk/overlay';
import { InfoAboutUserComponent } from '../info-about-user/info-about-user.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LogTimeVacationService } from 'src/app/services/LogTimeVacation/log-time-vacation.service';
import * as moment from 'moment';
import { LogTimeVacationInNewYer } from 'src/app/model/LogTimeVacationInNewYear';

export interface ParamsStaffPag {
  page: number;
  size: number;
  name: string;
}

@Component({
  selector: 'app-admin-staff-list',
  templateUrl: './admin-staff-list.component.html',
  styleUrls: ['./admin-staff-list.component.scss']
})

export class AdminStaffListComponent implements OnInit {



  staffList: Employee[] = [];
  employee: Employee[] = [];
  duration = 5000;
  urlCV!: string;
  photoEmployee: UploadPhoto[] = [];
  searchByName = new FormControl();
  logTimeRequest: LogTimeVacationInNewYer[] = [];
  page = 0;
  count = 0;
  pageSize = 10;
  docPDF!: any;
  private unsubscribe = new Subject();

  displayedColumns: string[] = ['photo', 'name', 'position', 'birthday', 'salary',
   'phone', 'firstDay', 'skype', 'email', 'vacation','sickLeave', 'about', 'cv', 'change'];

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog,
    public uplFileService: UploadFileService,
    public uloadPhotoService: UploadPhotoService,
    private snackBar: MatSnackBar,
    private overlay: Overlay,
    private authService: AuthService,
    private logTimeVacationService: LogTimeVacationService
  ) {
    this.searchByName.valueChanges
      .pipe(
        takeUntil(this.unsubscribe),
        debounceTime(300),
        switchMap((value: any) => {
          const params: ParamsStaffPag = {
            page: this.page,
            size: this.pageSize,
            name: this.searchByName.value
          };
          return this.employeeService.getStaffListPagination(params);
        }),
      ).subscribe((list: any) => {
        if (list.staffList.length) {
          const { staffList, totalItems } = list;
          this.staffList = staffList;
          this.count = totalItems;
        } else {
          this.staffList = [];
        }
      });
  }


  ngOnInit(): void {
    this.employee = this.authService.user;
    this.retrieveStaff();
    this.getPhotoEmployee();
    this.getCountVacation();
  }

  ngOnDesttroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getPhotoEmployee() {
    this.uloadPhotoService.GetPhoto()
      .subscribe((res) => {
        this.photoEmployee = res;
      });
  }

  getEmployeePhoto(userId: string) {
    const imgResult = this.photoEmployee.find(img => img.idEmployee === userId);
    return imgResult?.imagePath ?? '../../../assets/img/nouser.jpeg';
  }

  

  getCountVacation() {
    this.logTimeVacationService.GetCurrentRequest()
    .subscribe((res) => {
      this.logTimeRequest = res;
      console.log(res);
      
    })
  }

  getVacationEmployee(userId: string) {
    const requestResult = this.logTimeRequest.find(req => req.idEmployee === userId);
    return requestResult?.vacation ?? '0';
  }

  getSickLeaveEmployee(userId: string) {
    const requestResult = this.logTimeRequest.find(req => req.idEmployee === userId);
    return requestResult?.sickLeave ?? '0';
  }

  retrieveStaff(): void {
    const params: ParamsStaffPag = {
      page: this.page,
      size: this.pageSize,
      name: ''
    };
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

  handlePageChange(event: any): void {
    this.page = event.pageIndex;
    this.retrieveStaff();
  }

  getCV(user: Employee) {
    this.uplFileService.getUplFileById(user)
      .subscribe((res) => {
        if (res) {
          this.urlCV = res.imagePath;
          const iframe = '<iframe width=\'100%\' height=\'100%\' src=\'' + this.urlCV + '\'></iframe>';
          this.docPDF = window.open();
          this.docPDF.document.write(iframe);
          this.docPDF.document.close();
        } else {
          this.snackBar.open('CV was not added!', '', {
            duration: this.duration
          });
        }
      });
  }

  addUser(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '398px',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      height: '890px',
      disableClose: true,
      data: {
        head: 'Add user:',
        btn: 'ADD',
        showArhiveUser: false,
        addCV: 'Add CV',
        changeUser: '',
        showRole: true,
        showCV: true,
        disableClose: true,
        showPassword: true,
        showLastPerf: false,
      }
    });
    dialogRef.afterClosed().subscribe(result => {      
      if (result) {
        this.retrieveStaff();
        this.getPhotoEmployee();
        this.getEmployeePhoto(result.id);
      }
    });
  }

  aboutUser(employee: Employee): void {
    const dialogRef = this.dialog.open(InfoAboutUserComponent, {
      width: '398px',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      minHeight: '100px',
      height: 'auto',
      disableClose: true,
      data: {
        user: employee,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
    
  }

  editUser(event: Employee): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '398px',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      height: '870px',
      disableClose: true,
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
        this.retrieveStaff();
        this.getPhotoEmployee();
        this.getEmployeePhoto(result.id);
      }
    });
  }
}
