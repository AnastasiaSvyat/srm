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
    console.log(this.dataUser);
    

    this.addEmployeeForm = new FormGroup({
      name: new FormControl(this.dataUser.updateEmployee.name,[Validators.required]),
      email : new FormControl(this.dataUser.updateEmployee.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.dataUser.updateEmployee.phone,[Validators.required]),
      birthday: new FormControl(this.dataUser.updateEmployee.birthday,[Validators.required]),
      id: new FormControl(this.dataUser.id,[Validators.required])

    })
  }
  get name() { return this.addEmployeeForm.get('name')!; }
  get email() { return this.addEmployeeForm.get('email')!; }
  get birthday() { return this.addEmployeeForm.get('birthday')!; } 
  get phone() { return this.addEmployeeForm.get('phone')!; }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

}