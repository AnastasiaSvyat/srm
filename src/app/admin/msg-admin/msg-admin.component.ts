import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CountRequest } from 'src/app/model/countRequest';
import { Request } from 'src/app/model/Request';
import { UploadPhoto } from 'src/app/model/UploadPhoto';
<<<<<<< HEAD
import { CountServiceService } from 'src/app/services/countReq/count-service.service';
=======
>>>>>>> d387566ec0979b27dffcb7e2bfa2d8adeff10191
import { CountRequestService } from 'src/app/services/countRequest/count-request.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { RequestService } from 'src/app/services/request/request.service';
import { UploadPhotoService } from 'src/app/services/uploadPhoto/upload-photo.service';
<<<<<<< HEAD
import * as moment from 'moment';
import { Employee } from 'src/app/model/Employee';
import { LogTimeVacationService } from 'src/app/services/LogTimeVacation/log-time-vacation.service';
import { LogTimeVacationInNewYer } from 'src/app/model/LogTimeVacationInNewYear';
=======
>>>>>>> d387566ec0979b27dffcb7e2bfa2d8adeff10191

@Component({
  selector: 'app-msg-admin',
  templateUrl: './msg-admin.component.html',
  styleUrls: ['./msg-admin.component.scss']
})
export class MsgAdminComponent implements OnInit {

  constructor(
    private requestService: RequestService,
    private countRequestService: CountRequestService,
<<<<<<< HEAD
    private countService: CountServiceService,
    private uloadPhotoService: UploadPhotoService,
    private employeeService: EmployeeService,
    private logTimeVacationService: LogTimeVacationService
  ) { }
=======
    private uloadPhotoService: UploadPhotoService) { }
>>>>>>> d387566ec0979b27dffcb7e2bfa2d8adeff10191

  pendingRequestList: Request[] = [];
  confirmRequestList: Request[] = [];
  dataCountRequest!: number;
  photoEmployee: UploadPhoto[] = [];
<<<<<<< HEAD
  staffList: Employee[] = [];
  employeeInLogTimeRequestList!: boolean;

  dateArr: any = []
  sortedDate: any = []
  day: number = 0;

  countRequestInNewYear!: LogTimeVacationInNewYer;


=======

>>>>>>> d387566ec0979b27dffcb7e2bfa2d8adeff10191
  displayedColumns: string[] = ['employee', 'type', 'date', 'description', 'decline', 'confirm'];
  displayedColumnsConfirm: string[] = ['employee', 'type', 'date', 'confirmad', 'description', 'decline'];

  ngOnInit(): void {
    this.pendingRequest();
    this.confirmRequest();
    this.getPhotoEmployee();
<<<<<<< HEAD
    this.getStaffList();
=======
>>>>>>> d387566ec0979b27dffcb7e2bfa2d8adeff10191
    this.countRequestService.data$.subscribe((result) => {
      this.dataCountRequest = result;
    });
  }

  countRequest(count: any) {
    this.countRequestService.changeData(count);
  }

<<<<<<< HEAD
  getStaffList() {
    this.employeeService.GetStaff()
      .subscribe((res) => {
        this.staffList = res;
      })
  }

=======
>>>>>>> d387566ec0979b27dffcb7e2bfa2d8adeff10191
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

<<<<<<< HEAD
  getEmployee(userId: string) {
    const imgResult = this.staffList.find(empl => empl.id === userId);
    return imgResult ? imgResult.name + ' ' + imgResult.lastName : '-';
  }

=======
>>>>>>> d387566ec0979b27dffcb7e2bfa2d8adeff10191
  pendingRequest() {
    this.requestService.GetPendingRequest()
      .subscribe((res) => {
        this.pendingRequestList = res;
        console.log(this.pendingRequestList);
        this.countRequestService.data$.subscribe((result) => {
          this.dataCountRequest = result;
        });
        this.countRequest(this.pendingRequestList.length);
      });
  }

  confirmRequest() {
    this.requestService.ConfirmRequest()
      .subscribe((res) => {
        this.confirmRequestList = res;
      });
  }

  actionRequest(res: any, elem: any) {
<<<<<<< HEAD

=======
>>>>>>> d387566ec0979b27dffcb7e2bfa2d8adeff10191
    if (res) {
      elem.confirm = true;
      elem.decline = false;
    } else {
      elem.confirm = false;
      elem.decline = true;
    }
<<<<<<< HEAD

=======
>>>>>>> d387566ec0979b27dffcb7e2bfa2d8adeff10191
    this.requestService.UpdateRequest(elem._id, elem)
      .subscribe((res) => {
        console.log(res);
        
        if (elem.confirm && elem.type == 'DayOff') {
          if (elem.month == elem.endMonth) {
            this.requestInOneMonth(elem)
            const countReq: CountRequest = {
              idEmployee: elem.idEmployee,
              day: this.day + 1,
              month: elem.month
            }
            this.countService.daysRequest(countReq)
              .subscribe((res) => {
                console.log(res);
              }, (err) => {
                console.log(err);
              })
          } else {
            var start = new Date(elem.date);
            let end = new Date(moment().format('yyyy-MM-31'));
            const msec = end.getTime() - start.getTime();
            var day = Math.floor(msec / (1000 * 60 * 60 * 24) % 30);
            if (day < 0) {
              day = 0
            }
            const countReq: CountRequest = {
              idEmployee: elem.idEmployee,
              day: day + 1,
              month: elem.month
            }
            this.countService.daysRequest(countReq)
              .subscribe((res) => {
                console.log(res);
              }, (err) => {
                console.log(err);
              })
            var endDate = new Date(elem.endDate);
            let startMonth = new Date(moment().format('yyyy-MM-1'));
            const nextMonthsec = endDate.getTime() - startMonth.getTime();
            var dayReqNextMonth = Math.floor(nextMonthsec / (1000 * 60 * 60 * 24) % 30);
            if (day < 0) {
              day = 0
            }
            const countNextMonthReq: CountRequest = {
              idEmployee: elem.idEmployee,
              day: dayReqNextMonth + 1,
              month: elem.endMonth
            }
            this.countService.daysRequest(countNextMonthReq)
              .subscribe((res) => {
                console.log(res);
              }, (err) => {
                console.log(err);
              })
          }
        }
        this.UpdateCountRequest(elem)
        this.confirmRequest();
        this.pendingRequest();
      });
  }

  requestInOneMonth(elem: Request) {
    var start = new Date(elem.date);
    let end = new Date(elem.endDate);
    const msec = end.getTime() - start.getTime();
    this.day = Math.floor(msec / (1000 * 60 * 60 * 24) % 30) + 1;
    if (this.day < 0) {
      this.day = 1
    }


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
    }
  }

  UpdateCountRequest(elem: Request) {
    console.log(elem);
    
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
    if(elem.decline){
      this.declineRequest(elem);
      
    }
  }


  declineRequest(request: Request){
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
