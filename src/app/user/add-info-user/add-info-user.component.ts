import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Employee } from 'src/app/model/Employee';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-add-info-user',
  templateUrl: './add-info-user.component.html',
  styleUrls: ['./add-info-user.component.scss']
})
export class AddInfoUserComponent implements OnInit {
  infoAboutUserForm!: FormGroup;
  employee!: Employee;

  constructor(
    public dialogRef: MatDialogRef<AddInfoUserComponent>,
    private authService: AuthService,
    private emoloyeeService: EmployeeService) {
      this.employee = this.authService.user;
  }

  ngOnInit(): void {
    this.infoAboutUserForm = new FormGroup({
      info: new FormControl('', [Validators.required]),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addUserInfo(): any {
    this.employee.info.push(this.infoAboutUserForm.value);
    this.emoloyeeService.updateEmployee(this.employee.id, this.employee)
      .subscribe(() => {
        this.dialogRef.close();
      }, (err) => {
        console.log(err);
      });
  }
}
