import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CountRequest } from 'src/app/model/countRequest';
import { Request } from 'src/app/model/Request';
import { UploadPhoto } from 'src/app/model/UploadPhoto';
import { CountServiceService } from 'src/app/services/countReq/count-service.service';
import { CountRequestService } from 'src/app/services/countRequest/count-request.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { RequestService } from 'src/app/services/request/request.service';
import { UploadPhotoService } from 'src/app/services/uploadPhoto/upload-photo.service';
import * as moment from 'moment';
import { Employee } from 'src/app/model/Employee';
import { LogTimeVacationService } from 'src/app/services/LogTimeVacation/log-time-vacation.service';
import { LogTimeVacationInNewYer } from 'src/app/model/LogTimeVacationInNewYear';
import { AmountConfirmedRequestMonthService } from 'src/app/services/amountConfirmedRequestMonth/amount-confirmed-request-month.service';
import { AmountConfirmedRequestMonth } from 'src/app/model/amountConfirmedRequestMonth';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-msg-admin',
  templateUrl: './msg-admin.component.html',
  styleUrls: ['./msg-admin.component.scss']
})
export class MsgAdminComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator) paginatoreee!: MatPaginator;

  @ViewChild('paginatorDec') paginatorDec!: MatPaginator;

  constructor(
    private requestService: RequestService,
    private countRequestService: CountRequestService,
    private uloadPhotoService: UploadPhotoService,
    private employeeService: EmployeeService,
    private logTimeVacationService: LogTimeVacationService,
    private amountConfirmedRequestMonthService: AmountConfirmedRequestMonthService
  ) { }

  public dataSourcePending: MatTableDataSource<Request> = new MatTableDataSource();
  public dataSourceConfirmed: MatTableDataSource<Request> = new MatTableDataSource();
  public dataSourceDeclined: MatTableDataSource<Request> = new MatTableDataSource();


  pendingRequestList: Request[] = [];
  confirmRequestList: Request[] = [];
  declinedRequestList: Request[] = [];
  dataCountRequest!: number;
  photoEmployee: UploadPhoto[] = [];
  staffList: Employee[] = [];
  employeeInLogTimeRequestList!: boolean;
  showDeclineRequest!: boolean;
  amountConfirmedRequestMonth!: AmountConfirmedRequestMonth;

  workingDaysCurrentMonth: number = 0;
  workingDaysSecondMonth!: any;
  workingDaysFirstMonth!: any;

  currentMonth!: any;

  countRequestInNewYear!: LogTimeVacationInNewYer;


  displayedColumns: string[] = ['employee', 'type', 'date', 'description', 'decline', 'confirm'];
  displayedColumnsConfirm: string[] = ['employee', 'type', 'date', 'description'];

  ngOnInit(): void {
    this.pendingRequest();
    this.getPhotoEmployee();
    this.getStaffList();
    this.countRequestService.data$.subscribe((result) => {
      this.dataCountRequest = result;
    });
  }

  countRequest(count: any) {
    this.countRequestService.changeData(count);
  }

  getStaffList() {
    this.employeeService.GetStaff()
      .subscribe((res) => {
        this.staffList = res;
      })
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

  getEmployee(userId: string) {
    const imgResult = this.staffList.find(empl => empl.id === userId);
    return imgResult ? imgResult.name + ' ' + imgResult.lastName : '-';
  }

  pendingRequest() {
    this.requestService.GetPendingRequest()
      .subscribe((res) => {
        this.pendingRequestList = res;
        this.countRequestService.data$.subscribe((result) => {
          this.dataCountRequest = result;
          this.dataSourcePending = new MatTableDataSource(res)
          this.dataSourcePending.paginator = this.paginatoreee;
        });
        this.countRequest(this.pendingRequestList.length);
      });
  }

  getConfirmRequest() {
    this.showDeclineRequest = false;
    this.requestService.ConfirmRequest()
      .subscribe((res) => {
        this.confirmRequestList = res;
        this.dataSourceConfirmed = new MatTableDataSource(res)
        this.dataSourceConfirmed.paginator = this.paginator;
      });
  }

  getDeclineRequestList() {
    this.showDeclineRequest = true;
    this.requestService.DeclineRequest()
      .subscribe((res) => {
        this.declinedRequestList = res;
        this.dataSourceConfirmed = new MatTableDataSource(this.declinedRequestList)
        this.dataSourceConfirmed.paginator = this.paginator;
      });
  }

  toggleSelectedTab() {

  }

  tabChanged(event: any) {
    if (event.index == 2) {
      this.getDeclineRequestList();
    }
    if (event.index == 1) {
      this.getConfirmRequest();
    }
  }

  actionRequest(res: any, elem: any) {
    if (res) {
      elem.confirm = true;
      elem.decline = false;
    } else {
      elem.confirm = false;
      elem.decline = true;
    }
    this.requestService.UpdateRequest(elem._id, elem)
      .subscribe((res) => {
        this.UpdateCountRequest(elem)
        this.amountConfirmedRequestCurrentMonth(elem);
        this.getConfirmRequest();
        this.pendingRequest();
      });
  }


  amountConfirmedRequestCurrentMonth(elem: Request) {
    if (elem.confirm) {
      if (elem.month == elem.endMonth) {
        this.requestInOneMonth(elem);
        this.currentMonth = elem.date;
        this.amountConfirmedRequestMonthService.amountConfirmedRequestMonth({
          idEmployee: elem.idEmployee,
          date: elem.date,
          request: {
            name: elem.type,
            count: this.workingDaysCurrentMonth
          }
        })
          .subscribe((res) => {
            // console.log(res);
          })
      } else {
        this.requestInDifferentMonth(elem)
        this.currentMonth = elem.endDate;


        this.amountConfirmedRequestMonthService.amountConfirmedRequestMonth({
          idEmployee: elem.idEmployee,
          date: elem.date,
          request: {
            name: elem.type,
            count: this.workingDaysFirstMonth
          }
        })
          .subscribe((res) => {
            if (res) {

              this.amountConfirmedRequestMonthService.amountConfirmedRequestMonth({
                idEmployee: elem.idEmployee,
                date: this.currentMonth,
                request: {
                  name: elem.type,
                  count: this.workingDaysSecondMonth
                }
              })
                .subscribe((res) => {
                  // console.log(res);

                })
            }

          })
      }
    }
  }


  stringToDate(dateString: any) {
    dateString = dateString.split('-');
    return new Date(dateString[0], dateString[1] - 1, dateString[2]);
  }


  requestInOneMonth(elem: Request) {
    let startDate = new Date(elem.date);
    let endDate = new Date(elem.endDate);
    const msec = endDate.getTime() - startDate.getTime();
    let allDays = Math.floor(msec / (1000 * 60 * 60 * 24) % 30) + 1;
    this.workingDaysCurrentMonth = this.countWorkingDays(startDate, allDays)
  }

  countWorkingDays(startDate: any, allDays: any) {
    let weekends = 0;
    for (let i = 0; i < allDays; i++) {
      if (startDate.getDay() == 0 || startDate.getDay() == 6) weekends++;
      startDate = new Date(startDate.valueOf());
      let countStartDate = startDate.getTime() + 1000 * 60 * 60 * 24;
      startDate = new Date(countStartDate);
    }
    return allDays - weekends
  }

  requestInDifferentMonth(elem: Request) {

    var startFirstMonthDay = new Date(elem.date);
    let endFirstMonthDay = new Date(moment(elem.date).format('yyyy-MM-31'));
    const msec = endFirstMonthDay.getTime() - startFirstMonthDay.getTime();
    var workingDaysFirstMonth = Math.floor(msec / (1000 * 60 * 60 * 24) % 30);

    this.workingDaysFirstMonth = this.countWorkingDays(startFirstMonthDay, workingDaysFirstMonth);


    var endSecondMonthDate = new Date(elem.endDate);
    let startSecondMonthDate = new Date(moment().format('yyyy-MM-1'));
    const nextMonthsec = endSecondMonthDate.getTime() - startSecondMonthDate.getTime();
    var dayReqNextMonth = Math.floor(nextMonthsec / (1000 * 60 * 60 * 24) % 30);

    this.workingDaysSecondMonth = this.countWorkingDays(startSecondMonthDate, dayReqNextMonth);

    this.workingDaysCurrentMonth = workingDaysFirstMonth + dayReqNextMonth;

    if (this.workingDaysCurrentMonth < 0) {
      this.workingDaysCurrentMonth = 1
    }
  }

  UpdateCountRequest(elem: Request) {
    if (elem.month == elem.endMonth) {
      this.requestInOneMonth(elem);
    } else {
      this.requestInDifferentMonth(elem)
    }
    if (elem.confirm && elem.type == 'Vacation') {
      this.logTimeVacationService.UpdateLogTimeCurrentVacationById({
        sickLeave: 0,
        idEmployee!: elem.idEmployee,
        vacation!: this.workingDaysCurrentMonth,
      })
        .subscribe((res) => {
          // console.log(res);
        })
    } else if (elem.confirm && elem.type == 'Sick Leave') {
      this.logTimeVacationService.UpdateLogTimeCurrentVacationById({
        sickLeave: this.workingDaysCurrentMonth,
        idEmployee!: elem.idEmployee,
        vacation!: 0,
      })
        .subscribe((res) => {
          // console.log(res);
        })
    }
    if (elem.decline) {
      this.declineRequest(elem);

    }
  }


  declineRequest(request: Request) {
    if (request.decline && request.type == 'Vacation') {
      this.logTimeVacationService.UpdateDeclineLogTimeCurrentVacationById({
        sickLeave: 0,
        idEmployee!: request.idEmployee,
        vacation!: this.workingDaysCurrentMonth,
        date!: request.date
      })
        .subscribe((res) => {
          // console.log(res);
        })
    } else if (request.decline && request.type == 'Sick Leave') {
      this.logTimeVacationService.UpdateDeclineLogTimeCurrentVacationById({
        sickLeave: this.workingDaysCurrentMonth,
        idEmployee!: request.idEmployee,
        vacation!: 0,
        date!: request.date
      })
        .subscribe((res) => {
          // console.log(res);
        })
    }
  }

}
