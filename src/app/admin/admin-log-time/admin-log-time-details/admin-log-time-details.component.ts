import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AmountConfirmedRequestMonthService } from 'src/app/services/amountConfirmedRequestMonth/amount-confirmed-request-month.service';
import { LogTimeService } from 'src/app/services/logTime/log-time.service';

@Component({
  selector: 'app-admin-log-time-details',
  templateUrl: './admin-log-time-details.component.html',
  styleUrls: ['./admin-log-time-details.component.scss']
})
export class AdminLogTimeDetailsComponent implements OnInit {

  requestCurrentEmployee: any[] = [];
  timeInProjectCurrentEmployee: any[] = [];


  constructor(
    public dialogRef: MatDialogRef<AdminLogTimeDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private amountConfirmedRequestMonthService: AmountConfirmedRequestMonthService,
    private logTimeService: LogTimeService
  ) { }

  ngOnInit(): void {
    console.log(this.data.monthWithYear);
    this.getAmountConfirmedRequestMonthService();
    this.getProjectSelectEmployeeCurrentMonth();
  }

  getAmountConfirmedRequestMonthService() {
    console.log(this.data.monthWithYear);
    
    this.amountConfirmedRequestMonthService.getRequestCurrentUser(this.data.employeeId, this.data.monthWithYear)
      .subscribe((res) => {
        console.log(res);
        
        if (res) {
          this.requestCurrentEmployee = res.request;
        }

      })
  }

  getProjectSelectEmployeeCurrentMonth() {
    this.logTimeService.getCurrentMonthRequestSelectEmployeeLogTime(this.data.month, this.data.employeeId)
      .subscribe((res) => {
        if (res) {
          this.timeInProjectCurrentEmployee = res.timeInProject;
        }

      })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
