import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AdminComponent } from '../admin.component';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { MaterialService } from 'src/app/services/material/material.service';
import { AdminStaffListComponent } from '../admin-staff-list/admin-staff-list.component';
import { DashboardAdminComponent } from '../dashboard-admin/dashboard-admin.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  
  addEmployeeForm!: FormGroup;


  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddUserComponent,DashboardAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public dataUser: DashboardAdminComponent
) { 

}
  ngOnInit(): void {
    this.addEmployeeForm = new FormGroup({
      name: new FormControl(this.dataUser.changeUser.name,[Validators.required]),
      email : new FormControl(this.dataUser.changeUser.email, [Validators.required, Validators.email]),
      password: new FormControl(this.dataUser.changeUser.password,[Validators.required,Validators.minLength(6)]),
      salary: new FormControl(this.dataUser.changeUser.salary,[Validators.required]),
      phone: new FormControl(this.dataUser.changeUser.phone,[Validators.required]),
      position: new FormControl(this.dataUser.changeUser.position,[Validators.required]),
      lastPerf: new FormControl(this.dataUser.changeUser.lastPerf,[Validators.required]),
      birthday: new FormControl(this.dataUser.changeUser.birthday,[Validators.required]),
      role: new FormControl(this.dataUser.changeUser.role,[Validators.required]),
      id: new FormControl(this.dataUser.changeUser.id,[Validators.required])

    })
  }
  get name() { return this.addEmployeeForm.get('name')!; }
  get email() { return this.addEmployeeForm.get('email')!; }
  get password() { return this.addEmployeeForm.get('password')!; }
  get position() { return this.addEmployeeForm.get('position')!; }
  get role() { return this.addEmployeeForm.get('role')!; }
  get birthday() { return this.addEmployeeForm.get('birthday')!; } 
  get salary() { return this.addEmployeeForm.get('salary')!; }
  get phone() { return this.addEmployeeForm.get('phone')!; }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
