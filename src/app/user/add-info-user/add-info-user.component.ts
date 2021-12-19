import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    private emoloyeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public dataUser: any
  ) { }

  ngOnInit(): void {
    this.infoAboutUserForm = new FormGroup({
      infoUser: new FormControl(this.dataUser.updateEmployee.infoUser, [Validators.required]),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addUserInfo(employee: Employee): any {
    this.emoloyeeService.updateEmployee(this.dataUser.updateEmployee.id, employee)
      .subscribe((res) => {
        this.dialogRef.close(res);
      }, (err) => {
        console.log(err);
      });
  }
}
