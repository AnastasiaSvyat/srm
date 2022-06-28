import { Component, Inject, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from 'src/app/model/Employee';
import { LogTime } from 'src/app/model/logTime';
import { Month } from 'src/app/model/month';
import { MonthArr } from 'src/app/helpers/month';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LogTimeService } from 'src/app/services/logTime/log-time.service';
import * as moment from 'moment';
import { AmountConfirmedRequestMonthService } from 'src/app/services/amountConfirmedRequestMonth/amount-confirmed-request-month.service';
import { AmountConfirmedRequestMonth } from 'src/app/model/amountConfirmedRequestMonth';

@Component({
  selector: 'app-user-add-month-log-time',
  templateUrl: './user-add-month-log-time.component.html',
  styleUrls: ['./user-add-month-log-time.component.scss']
})
export class UserAddMonthLogTimeComponent implements OnInit {

  form!: FormGroup;
  logForm!: FormGroup;

  employee!: Employee;
  currentMonth!: Month;
  currentYear = moment().format('yyyy');
  selectMonthAndYear: string = ''
  duration = 5000;

  sumHours: number = 0;

  amountConfirmedRequestMonth!: any;


  constructor(
    public dialogRef: MatDialogRef<UserAddMonthLogTimeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    private auth: AuthService,
    private logTimeService: LogTimeService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private amountConfirmedRequestMonthService: AmountConfirmedRequestMonthService
  ) { }

  ngOnInit(): void {

    this.currentMonth = MonthArr[this.data.month.id - 1];
    this.selectMonthAndYear =  this.currentMonth.month + '-01=' + this.currentYear
    
    this.employee = this.auth.user;
    this.initCountConfirmRequestCurrentMonth();

    this.form = this.fb.group({
      logTimeList: this.fb.array([
        this.fb.group({
          projectName: new FormControl(),
          billableTime: new FormControl(),
          unbillableTime: new FormControl(),
        })
      ])

    });
  }

  get logTimeList() {
    return this.form.controls["logTimeList"] as FormArray;
  }

  initCountConfirmRequestCurrentMonth(){
    const date = moment(new Date(this.selectMonthAndYear)).format('MM-YYYY')
    
    this.amountConfirmedRequestMonthService.getRequestCurrentUser(this.employee.id, date)
    .subscribe((res) => {
        this.amountConfirmedRequestMonth = res;
    })
  }

  addOneMoreProject() {
    this.logForm = this.fb.group({
      projectName: new FormControl(),
      billableTime: new FormControl(),
      unbillableTime: new FormControl(),
    });
    this.logTimeList.push(this.logForm);
  }


  deleteLesson(lessonIndex: number) {
    this.logTimeList.removeAt(lessonIndex);
  }


  onNoClick() {
    this.dialogRef.close();
  }


  logTime() {

    this.logTimeList.value.forEach((element : any) => {
      console.log(this.sumHours);
      

      this.sumHours =  this.sumHours  + Number(element.billableTime) + Number(element.unbillableTime)
      console.log(this.sumHours);

    });

    this.logTimeService.LogTime({
      idEmployee: this.employee.id,
      month: this.data.month.id,
      monthString: this.data.month.month,
      timeInProject: this.logTimeList.value,
      sumHours: this.sumHours
    })
      .subscribe((res) => {
        console.log(res);

        this.snackBar.open('Congratulations! Time has been added!', '', {
          duration: this.duration
        });
        this.dialogRef.close(res);
      }, (err) => {
        this.snackBar.open('ERROR! Try again.', '', {
          duration: this.duration
        });
      })
  }

}
