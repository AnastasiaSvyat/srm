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
    private countService: CountServiceService,
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
  decline!: boolean;
  amountConfirmedRequestMonth!: AmountConfirmedRequestMonth;

  dateArr: any = []
  sortedDate: any = []
  day: number = 0;
  dayCurrentMonth: number = 0;
  dayReqNextMonth!: any;
  dayStart!: any;

  date!: any;


  countRequestInNewYear!: LogTimeVacationInNewYer;


  displayedColumns: string[] = ['employee', 'type', 'date', 'description', 'decline', 'confirm'];
  displayedColumnsConfirm: string[] = ['employee', 'type', 'date', 'description'];

  ngOnInit(): void {
    this.pendingRequest();
    // this.getConfirmRequest();
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
        console.log(this.pendingRequestList);
        this.countRequestService.data$.subscribe((result) => {
          this.dataCountRequest = result;
          this.dataSourcePending = new MatTableDataSource(res)
          this.dataSourcePending.paginator = this.paginatoreee;
         


          
        });
        this.countRequest(this.pendingRequestList.length);
      });
  }

  getConfirmRequest() {
    this.decline = false;

    this.requestService.ConfirmRequest()
      .subscribe((res) => {
        this.confirmRequestList = res;
        this.dataSourceConfirmed = new MatTableDataSource(res)
        this.dataSourceConfirmed.paginator = this.paginator;
        console.log(this.dataSourceConfirmed.paginator);
      });
  }

  getDeclineRequestList() {
    this.decline = true;
    this.requestService.DeclineRequest()
      .subscribe((res) => {
        this.declinedRequestList = res;
        this.dataSourceConfirmed = new MatTableDataSource(this.declinedRequestList)
        this.dataSourceConfirmed.paginator = this.paginator;
        console.log(this.dataSourceConfirmed.paginator);
      });
  }

  toggleSelectedTab() {
    
  }

  tabChanged(event: any){
    if(event.index == 2){
      this.getDeclineRequestList();

    }

    if(event.index == 1){
      this.getConfirmRequest();

    }
    console.log(event);
    

    
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
        console.log(res);
        this.UpdateCountRequest(elem)
        this.amountConfirmedRequestCurrentMonth(elem);
        this.getConfirmRequest();
        this.pendingRequest();
      });
  }


  amountConfirmedRequestCurrentMonth(elem: Request) {

    if (elem.month == elem.endMonth) {
      console.log(elem.date);
      console.log(this.dayCurrentMonth);
      
      this.requestInOneMonth(elem);
      this.date = elem.date;
      
    this.amountConfirmedRequestMonthService.amountConfirmedRequestMonth({
      idEmployee: elem.idEmployee,
      date: elem.date,
      request:{
        name: elem.type ,
        count: this.dayCurrentMonth
      }
    })
      .subscribe((res) => {
        console.log(res);

      })
    } else {
      this.requestInDifferentMonth(elem)
      this.date = elem.endDate;
      console.log(this.dayStart);
      console.log(this.dayReqNextMonth);
      
      this.amountConfirmedRequestMonthService.amountConfirmedRequestMonth({
        idEmployee: elem.idEmployee,
        date: elem.date,
        request:{
          name: elem.type ,
          count: this.dayStart
        }
      })
        .subscribe((res) => {
          if(res){
            
    this.amountConfirmedRequestMonthService.amountConfirmedRequestMonth({
      idEmployee: elem.idEmployee,
      date: this.date,
      request:{
        name: elem.type ,
        count: this.dayReqNextMonth
      }
    })
      .subscribe((res) => {
        console.log(res);

      })
          }
  
        })
    }

  }

  requestInOneMonth(elem: Request) {
    var start = new Date(elem.date);
    let end = new Date(elem.endDate);
    const msec = end.getTime() - start.getTime();
    this.day = Math.floor(msec / (1000 * 60 * 60 * 24) % 30) + 1;
    this.dayCurrentMonth = this.day;
    if (this.day < 0) {
      this.day = 1
    }
    this.dayCurrentMonth = this.day;
  }

  requestInDifferentMonth(elem: Request) {
    var startFirstMonthDay = new Date(elem.date);
    let endFirstMonthDay = new Date(moment(elem.date).format('yyyy-MM-31'));
    const msec = endFirstMonthDay.getTime() - startFirstMonthDay.getTime();
    var dayStart = Math.floor(msec / (1000 * 60 * 60 * 24) % 30);

    var endSecondMonthDate = new Date(elem.endDate);
    let startSecondMonthDate = new Date(moment().format('yyyy-MM-1'));
    const nextMonthsec = endSecondMonthDate.getTime() - startSecondMonthDate.getTime();
    var dayReqNextMonth = Math.floor(nextMonthsec / (1000 * 60 * 60 * 24) % 30);

    this.day = dayStart + dayReqNextMonth;
    if (this.day < 0) {
      this.day = 1
      this.dayCurrentMonth = this.day;
    }
    this.dayStart = dayStart;
    this.dayReqNextMonth =  dayReqNextMonth;

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
        vacation!: this.day,
      })
        .subscribe((res) => {
          console.log(res);
        })
    } else if (elem.confirm && elem.type == 'Sick Leave') {
      this.logTimeVacationService.UpdateLogTimeCurrentVacationById({
        sickLeave: this.day,
        idEmployee!: elem.idEmployee,
        vacation!: 0,
      })
        .subscribe((res) => {
          console.log(res);
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
        vacation!: this.day,
        date!: request.date
      })
        .subscribe((res) => {
          console.log(res);
        })
    } else if (request.decline && request.type == 'Sick Leave') {
      this.logTimeVacationService.UpdateDeclineLogTimeCurrentVacationById({
        sickLeave: this.day,
        idEmployee!: request.idEmployee,
        vacation!: 0,
        date!: request.date
      })
        .subscribe((res) => {
          console.log(res);
        })
    }
  }

}
