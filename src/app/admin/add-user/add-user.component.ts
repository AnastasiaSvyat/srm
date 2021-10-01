import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AdminComponent } from '../admin.component';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { MaterialService } from 'src/app/services/material/material.service';
import { AdminStaffListComponent } from '../admin-staff-list/admin-staff-list.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  
  addEmployeeForm!: FormGroup;


  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddUserComponent,AdminStaffListComponent>,
    @Inject(MAT_DIALOG_DATA) public dataUser: AdminStaffListComponent
) { 

}
  ngOnInit(): void {
    this.addEmployeeForm = new FormGroup({
      name: new FormControl(this.dataUser.name,[Validators.required]),
      email : new FormControl(this.dataUser.email, [Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)]),
      salary: new FormControl(this.dataUser.salary,[Validators.required]),
      phone: new FormControl(this.dataUser.phone,[Validators.required]),
      position: new FormControl(this.dataUser.position,[Validators.required]),
      lastPerf: new FormControl(this.dataUser.lastPerf,[Validators.required]),
      birthday: new FormControl(this.dataUser.birthday,[Validators.required]),
      role: new FormControl('',[Validators.required])
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
