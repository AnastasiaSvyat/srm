import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from 'src/app/model/Employee';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LogTimeService } from 'src/app/services/logTime/log-time.service';

@Component({
  selector: 'app-user-add-month-log-time',
  templateUrl: './user-add-month-log-time.component.html',
  styleUrls: ['./user-add-month-log-time.component.scss']
})
export class UserAddMonthLogTimeComponent implements OnInit {

  logTimeForm!: FormGroup;
  employee!: Employee;

  duration = 5000;

  constructor(
    public dialogRef: MatDialogRef<UserAddMonthLogTimeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    private auth: AuthService,
    private logTimeService: LogTimeService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.employee = this.auth.user;

    this.logTimeForm = new FormGroup({
      time: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      month: new FormControl(this.data.month.id),
      idEmployee: new FormControl(this.employee.id),
      monthString: new FormControl(this.data.month.month),
    });
  }

  get time() { return this.logTimeForm.get('time'); }

  onNoClick() {
    this.dialogRef.close();
  }

  logTime(time: any) {
    this.logTimeService.LogTime(time)
      .subscribe((res) => {
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
