import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { Employee } from 'src/app/model/Employee';
import { Request } from 'src/app/model/Request';
import { UploadPhoto } from 'src/app/model/UploadPhoto';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { RequestService } from 'src/app/services/request/request.service';
import { UploadPhotoService } from 'src/app/services/uploadPhoto/upload-photo.service';
import * as moment from 'moment';
import { CountServiceService } from 'src/app/services/countReq/count-service.service';
import { CountRequest } from 'src/app/model/countRequest';
import { LogTimeService } from 'src/app/services/logTime/log-time.service';
import { LogTime } from 'src/app/model/logTime';
import { StandartHoursService } from 'src/app/services/standartHours/standart-hours.service';
import { Overlay } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material/dialog';
import { AdminAddStandartHoursComponent } from '../admin-add-standart-hours/admin-add-standart-hours.component';
import { StandartHours } from 'src/app/model/standartHours';


export interface ParamsStaffPag {
  page: number;
  size: number;
  name: string;
}

@Component({
  selector: 'app-admin-log-time',
  templateUrl: './admin-log-time.component.html',
  styleUrls: ['./admin-log-time.component.scss']
})
export class AdminLogTimeComponent implements OnInit {

  displayedColumns: string[] = ['photo', 'name', 'workTime', 'salary',
  // 'dayOff',
  //  'emergency', 'sickLeaves',
  //   'dayOff', 'vacation', 
    'sum'
    // 'about', 'cv', 'change'
  ];

  searchByName = new FormControl();
  private unsubscribe = new Subject();

  staffList: Employee[] = [];
  photoEmployee: UploadPhoto[] = [];
  employee!: Employee;
  requestList: Request[] = [];
  dayOffList: CountRequest[] = [];
  workTimeList: LogTime[] = [];
  standartHour!: StandartHours;



  page = 0;
  count = 0;
  pageSize = 10;
  previousDate!: any
  month!: any
  currentMonth!: any

 


  constructor(
    private employeeService: EmployeeService,
    private uploadPhotoService: UploadPhotoService,
    private authService: AuthService,
    private requestService: RequestService,
    private countService: CountServiceService,
    private logTimeService: LogTimeService,
    private standartHoursService: StandartHoursService,
    private overlay: Overlay,
    private dialog: MatDialog,
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

      this.previousDate = moment().subtract(1, 'months').calendar();   
      this.month = moment().subtract(1, 'months').format('MM');
      this.currentMonth = moment().subtract(1, 'months').locale('en').format('MMMM')
  }


  ngOnInit(): void {
    this.employee = this.authService.user;
    this.retrieveStaff();
    this.getPhotoEmployee();
    this.getConfirmedReguest();
    this.getDayOffCurrentMonth();
    this.getWorkTimeCurrentMonth();
    this.getStandartMonthHours();
  }


  getStandartMonthHours(){
    this.standartHoursService.getStandartHours()
    .subscribe((res) => {
      this.standartHour = res;      
    })
  }

  workTimeSum(userId: string, salary: string) {
    const reqResult = this.workTimeList.find(img => img.idEmployee === userId);
    return reqResult ? Math.ceil(Number(salary) / this.standartHour?.time * reqResult?.time) + '$' : '-';
  }

  addStandartMonthHours(){
    const dialogRef = this.dialog.open(AdminAddStandartHoursComponent, {
      width: '398px',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      minHeight: '281px',
      height: 'auto',
      disableClose: true,
      data: {hours: '', btn: 'ADD'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getStandartMonthHours()
      }
    });
  }

  updateHours(hours: StandartHours){
    const dialogRef = this.dialog.open(AdminAddStandartHoursComponent, {
      width: '398px',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      minHeight: '281px',
      height: 'auto',
      disableClose: true,
      data: {hours: hours, btn: 'SAVE'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getStandartMonthHours()
      }
    });
  }

  getDayOffCurrentMonth() {
    this.countService.currentMonthRequest(this.month)
    .subscribe((res) => {
      this.dayOffList = res;
    })
  }

  getWorkTimeCurrentMonth(){
    this.logTimeService.currentMonthRequestLogTime(this.month)
    .subscribe((res) => {
      this.workTimeList = res;
    })
  }

  getPhotoEmployee() {
    this.uploadPhotoService.GetPhoto()
      .subscribe((res) => {
        this.photoEmployee = res;
      });
  }

  getConfirmedReguest() {
    this.requestService.ConfirmRequest()
      .subscribe((res) => {
        this.requestList = res;
      })
  }

  getEmployeePhoto(userId: string) {
    const imgResult = this.photoEmployee.find(img => img.idEmployee === userId);
    return imgResult?.imagePath ?? '../../../assets/img/nouser.jpeg';
  }

  workTime(userId: string) {
    const reqResult = this.workTimeList.find(img => img.idEmployee === userId);
    return reqResult?.time ? reqResult?.time + 'H' : '-';
  }


  dayOff(userId: string) {
    const reqResult = this.dayOffList.find(req => req.idEmployee === userId);
    return reqResult?.day? reqResult?.day + 'H' : '-';
  }

 
  handlePageChange(event: any): void {
    this.page = event.pageIndex;
    this.retrieveStaff();
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

}
