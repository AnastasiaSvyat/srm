import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToDoList } from 'src/app/model/ToDoList';
import { DataEmployeeService } from 'src/app/services/dataEmployee/dataEmployee.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { ToDoListService } from 'src/app/services/toToList/to-do-list.service';
import { AdminComponent } from '../admin.component';
import { DashboardAdminComponent } from '../dashboard-admin/dashboard-admin.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  id: any;
  infoAboutUserForm!:FormGroup
  public employee: any;

  todo!:ToDoList
  constructor( public dialogRef: MatDialogRef<AddTaskComponent,DashboardAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public dataTask: DashboardAdminComponent,
    private service:DataEmployeeService,
    private taskService:ToDoListService,
    private emoloyeeService: EmployeeService ) { 
      this.service.data.subscribe(value => {
        this.employee = value
      });
    }


  ngOnInit(): void {
    this.id = this.employee.id
    this.infoAboutUserForm = new FormGroup({
      task: new FormControl(this.dataTask.task,[Validators.required]),
      date: new FormControl(this.dataTask.date,[Validators.required]),
      email: new FormControl(this.employee.email),
    })
    this.getInfo()
}
  onNoClick(): void {
    this.dialogRef.close();
  }

  getInfo(){
    this.emoloyeeService.GetEmployee(this.id)
      .subscribe(value => {
        this.employee = value
      });
  }
}