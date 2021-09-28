import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToDoList } from 'src/app/model/ToDoList';
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

  todo!:ToDoList
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
      id: new FormControl(Math.floor(Math.random() * (999999 - 100000)) + 100000),
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
this.todo = this.infoAboutUserForm.value
console.log(this.todo);

    this.employee.toDoList.push(this.todo)
    this.emoloyeeService.updateEmployee(this.getId, this.employee)
    .subscribe((res) => {
      console.log(res);
      
      this.dialogRef.close();
      this.employee = res
    }, (err) => {
        console.log(err);
    });
  }
}