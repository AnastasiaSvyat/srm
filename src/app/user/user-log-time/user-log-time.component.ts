import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MonthArr } from 'src/app/helpers/month';
import { Employee } from 'src/app/model/Employee';
import { LogTime } from 'src/app/model/logTime';
import { Month } from 'src/app/model/month';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LogTimeService } from 'src/app/services/logTime/log-time.service';
import { UserAddMonthLogTimeComponent } from './user-add-month-log-time/user-add-month-log-time.component';
import * as moment from 'moment';
import { AmountConfirmedRequestMonthService } from 'src/app/services/amountConfirmedRequestMonth/amount-confirmed-request-month.service';

@Component({
  selector: 'app-user-log-time',
  templateUrl: './user-log-time.component.html',
  styleUrls: ['./user-log-time.component.scss']
})
export class UserLogTimeComponent implements OnInit {

  monthArr!: Month[];
  date = new Date();
  month!: number;
  employee!: Employee;
  monthArrWithHour: LogTime[] = [];
  selectMonthAndYear: string = ''
  currentYear = moment().format('yyyy');
  amountConfirmedRequestMonth: any[] = [];
  currentMonth!: any;

  req: any = [];
  

  constructor(
    private overlay: Overlay,
    private dialog: MatDialog,
    private logTimeService: LogTimeService,
    private auth: AuthService,
    private amountConfirmedRequestMonthService: AmountConfirmedRequestMonthService,

  ) { }

  ngOnInit(): void {

    this.employee = this.auth.user;


    this.monthArr = MonthArr
    // this.initCountConfirmRequestCurrentMonth();
    this.month = this.date.getMonth()
    this.logTimeByEmployeeId();

  }

  logTimeByEmployeeId() {
    this.logTimeService.LogTimeByEmployeeId(this.employee.id)
      .subscribe((res) => {
        this.monthArrWithHour = res
      })
  }

  logTimeSelectMonth(monthId: any ) {
    const timeResult = this.monthArrWithHour.find(el => el.month === monthId);
    return timeResult?.sumHours ?? 'Add hours worked for a given month';
  }

  ee(month: any) {
    month = month + '-' + this.currentYear
    const timeResult = this.amountConfirmedRequestMonth.find(el => el.date == month);
    if(timeResult){
      this.req = timeResult.request;
      return 'f'
      
      // timeResult.request.forEach((element: any) => {
      //   return element.name + ':  ' +  element.count
      // });
    }else{
      return '-';
    }
  }


  showBtn(monthId: any) {
    const timeResult = this.monthArrWithHour.find(el => el.month === monthId);
    return timeResult?.sumHours ? false : true
  }

  initCountConfirmRequestCurrentMonth() {
    // console.log(month);

    this.monthArr.forEach(element => {
      this.currentMonth = MonthArr[Number(element.id) - 1];
      this.selectMonthAndYear = this.currentMonth.month + '-01=' + this.currentYear
      const date = moment(new Date(this.selectMonthAndYear)).format('MM-YYYY')
      
      this.amountConfirmedRequestMonthService.getRequestCurrentUser(this.employee.id, date)
        .subscribe((res) => {
          // console.log(res);
          if(res){

            this.amountConfirmedRequestMonth.push(res);
    console.log(this.amountConfirmedRequestMonth);
          }

        })
    console.log(this.amountConfirmedRequestMonth);

    });



  }

  logTime(month: Month | undefined) {
    const dialogRef = this.dialog.open(UserAddMonthLogTimeComponent, {
      width: '398px',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      minHeight: '281px',
      height: 'auto',
      disableClose: true,
      data: { month: month }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.logTimeByEmployeeId();
      }
    });
  }

}
