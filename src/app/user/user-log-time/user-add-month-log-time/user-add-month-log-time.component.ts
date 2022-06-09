import { Component, Inject, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from 'src/app/model/Employee';
import { LogTime } from 'src/app/model/logTime';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LogTimeService } from 'src/app/services/logTime/log-time.service';

@Component({
  selector: 'app-user-add-month-log-time',
  templateUrl: './user-add-month-log-time.component.html',
  styleUrls: ['./user-add-month-log-time.component.scss']
})
export class UserAddMonthLogTimeComponent implements OnInit {

  form!: FormGroup;
  logForm!: FormGroup;

  employee!: Employee;

  duration = 5000;

  sumHours: number = 0;


  constructor(
    public dialogRef: MatDialogRef<UserAddMonthLogTimeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    private auth: AuthService,
    private logTimeService: LogTimeService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.employee = this.auth.user;

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
