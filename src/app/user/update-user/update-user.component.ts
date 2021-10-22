import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardUserComponent } from '../dashboard-user/dashboard-user.component';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  addEmployeeForm!: FormGroup;


  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdateUserComponent,DashboardUserComponent>,
    @Inject(MAT_DIALOG_DATA) public dataUser: DashboardUserComponent
) { 

}
  ngOnInit(): void {
    this.addEmployeeForm = new FormGroup({
      name: new FormControl(this.dataUser.name,[Validators.required]),
      email : new FormControl(this.dataUser.email, [Validators.required, Validators.email]),
      password: new FormControl(this.dataUser.password,[Validators.required,Validators.minLength(6)]),
      salary: new FormControl(this.dataUser.salary,[Validators.required]),
      phone: new FormControl(this.dataUser.phone,[Validators.required]),
      position: new FormControl(this.dataUser.position,[Validators.required]),
      lastPerf: new FormControl(this.dataUser.lastPerf,[Validators.required]),
      birthday: new FormControl(this.dataUser.birthday,[Validators.required]),
      role: new FormControl(this.dataUser.role,[Validators.required]),
      id: new FormControl(this.dataUser.id,[Validators.required])

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
