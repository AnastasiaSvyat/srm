import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AdminComponent } from '../admin.component';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { CrudService } from 'src/app/services/crud.service';
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  
  addEmployeeForm!: FormGroup;


  constructor(
    private crudService: CrudService,  
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdminComponent
) { 

}
  ngOnInit(): void {
    this.addEmployeeForm = new FormGroup({
      name: new FormControl('',[Validators.required]),
      email : new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)]),
      salary: new FormControl('',[Validators.required]),
      phone: new FormControl('',[Validators.required]),
      position: new FormControl('',[Validators.required]),
      birthday: new FormControl('',[Validators.required]),
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
  addEmplyee(): void{
    console.log(this.addEmployeeForm.value);
    this.crudService.AddEmployee(this.addEmployeeForm.value)
    .subscribe(() => {
      MaterialService.toast("Congratulations! User has been added!")
      this.dialogRef.close();
      }, (err) => {
        console.log(err);
        MaterialService.toast("This email is already taken. Try another one.")
    });
  }
}
