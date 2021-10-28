import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DataEmployeeService } from 'src/app/services/dataEmployee/dataEmployee.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-add-info-user',
  templateUrl: './add-info-user.component.html',
  styleUrls: ['./add-info-user.component.scss']
})
export class AddInfoUserComponent implements OnInit {
  id: any;
  infoAboutUserForm!:FormGroup
  employee: any;
 

  constructor(public dialogRef: MatDialogRef<AddInfoUserComponent>,
    private service:DataEmployeeService,
    private emoloyeeService: EmployeeService ) { 
      this.service.data.subscribe(value => {
        this.employee = value
      });
    
    }
  
  ngOnInit(): void {
    this.id = this.employee.id
      this.infoAboutUserForm = new FormGroup({
        info: new FormControl('',[Validators.required]),
      })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  addUserInfo(): any {
    this.employee.info.push(this.infoAboutUserForm.value)
    this.emoloyeeService.updateEmployee(this.id, this.employee)
    .subscribe((res) => {
      this.dialogRef.close();
      this.employee = res
    }, (err) => {
        console.log(err);
    });
  }
}