import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from 'src/app/model/Employee';
import { NewPassword } from 'src/app/model/NewPassword';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-admin-update-password',
  templateUrl: './admin-update-password.component.html',
  styleUrls: ['./admin-update-password.component.scss']
})
export class AdminUpdatePasswordComponent implements OnInit {

  passwordForm!: FormGroup;

  duration = 5000;
  hide = true;
  hideRepeat = true;

  employee!: Employee;

  constructor(
    public dialogRef: MatDialogRef<AdminUpdatePasswordComponent>,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formBuilder: FormBuilder,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.employee = this.auth.user;
    this.employeeService.GetEmployee(this.employee.id)
      .subscribe((res) => {
        this.employee = res;
      });

    this.passwordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6),Validators.pattern(/^\S{0,}$/)]),
      repeatPassword: new FormControl('', [Validators.required, Validators.minLength(6),Validators.pattern(/^\S{0,}$/)])
    });
  }


  get password() { return this.passwordForm.get('password'); }
  get repeatPassword() { return this.passwordForm.get('repeatPassword'); }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updatePassword(password: NewPassword) {
    if (password.password === password.repeatPassword) {
      this.employeeService.updatePassword(this.employee.id, password)
        .subscribe((res) => {
          this.snackBar.open('Congratulations! Event has been added!', '', {
            duration: this.duration
          });
          this.dialogRef.close(password);
        }, (err) => {
          this.snackBar.open('ERROR! Try again.', '', {
            duration: this.duration
          });
        });
    }else{
      this.snackBar.open('Password mismatch! Try again.', '', {
        duration: this.duration
      });
    }
  }
}
