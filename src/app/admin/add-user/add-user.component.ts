import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AdminComponent } from '../admin.component';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  
  addEmployeeForm: FormGroup;
  
  constructor(
    private crudService: CrudService,  
    public formBuilder: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdminComponent
) { 
  this.addEmployeeForm = this.formBuilder.group({
    name: [''],
    email: [''],
    password: [''],
    salary: [''],
    phone: [''],
    position: [''],
    birthday: [''],
    role: ['']
  })
}

  ngOnInit(): void {
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  addEmplyee(): void{
    this.crudService.AddEmployee(this.addEmployeeForm.value)
    .subscribe(() => {
        console.log('Data added successfully!')
      }, (err) => {
        console.log(err);
    });
  }
}
