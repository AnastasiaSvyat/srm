import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MonthArr } from 'src/app/helpers/month';
import { Employee } from 'src/app/model/Employee';
import { LogTime } from 'src/app/model/logTime';
import { Month } from 'src/app/model/month';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LogTimeService } from 'src/app/services/logTime/log-time.service';
import { UserAddMonthLogTimeComponent } from '../user-add-month-log-time/user-add-month-log-time.component';

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

  constructor(
    private overlay: Overlay,
    private dialog: MatDialog,
    private logTimeService: LogTimeService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {

    this.employee = this.auth.user;

    this.monthArr = MonthArr
    this.month = this.date.getMonth()
    this.logTimeByEmployeeId();

  }

  logTimeByEmployeeId() {
    this.logTimeService.LogTimeByEmployeeId(this.employee.id)
      .subscribe((res) => {
        this.monthArrWithHour = res
      })
  }

  logTimeSelectMonth(monthId: any) {
    const timeResult = this.monthArrWithHour.find(el => el.month === monthId);
    return timeResult?.time ?? 'Add hours worked for a given month';
  }

  showBtn(monthId: any) {
    const timeResult = this.monthArrWithHour.find(el => el.month === monthId);
    return timeResult?.time ? false : true
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
