import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DataEmployeeService } from 'src/app/services/dataEmployee/dataEmployee.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { AdminComponent } from '../admin.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  getId: any;
  infoAboutUserForm!:FormGroup
  public employee: any;

  constructor( public dialogRef: MatDialogRef<AddTaskComponent>,
    private service:DataEmployeeService,
    private emoloyeeService: EmployeeService ) { 
      this.service.data.subscribe(value => {
        this.employee = value
      });
    }
  ngOnInit(): void {
    this.getId = this.employee.userId
    this.infoAboutUserForm = new FormGroup({
      toDoList: new FormControl('',[Validators.required]),
      date: new FormControl('',[Validators.required]),

    })
    this.getInfo()
}
  onNoClick(): void {
    this.dialogRef.close();
  }
  getInfo(){
    this.emoloyeeService.GetEmployee(this.getId)
      .subscribe(value => {
        this.employee = value
      });
  }
  addToDoList(): any {
    this.employee.toDoList.push(this.infoAboutUserForm.value)
    this.emoloyeeService.updateEmployee(this.getId, this.employee)
    .subscribe((res) => {
      this.dialogRef.close();
      this.employee = res
    }, (err) => {
        console.log(err);
    });
  }
}