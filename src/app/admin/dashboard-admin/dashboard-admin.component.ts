import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DataEmployeeService } from 'src/app/services/dataEmployee/dataEmployee.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { EventService } from 'src/app/services/event/event.service';
import { AddEventComponent } from '../add-event/add-event.component';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {
  employee:any = []
  events!:any
  empBirth!:any
  task:any = []
  getId!:any;
  isChecked:boolean = false;

  constructor(public dialog: MatDialog,
    private service:DataEmployeeService,
    private eventService: EventService,
    private emploeeService:EmployeeService ) {
  }
  
  ngOnInit(): void {
    this.service.data.subscribe(res => {
      this.employee = res
    });
    this.getEvent()
    this.getId = this.employee.userId
    this.emploeeService.GetStaff()
    
  }
  
 onChange($event:any){
   const id = $event.target.value
   const isChecked = $event.target.checked
console.log(id,isChecked);


 }
  addEvent(): void {
    const dialogRef = this.dialog.open(AddEventComponent, {
      width: '398px',
      height :'591px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getEvent()
    });
  }
  
  addTask(): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '398px',
      height :'361px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.emploeeService.GetEmployee(this.getId)
      .subscribe((res) => {
        this.employee = res
      })
    });
  }
  
  getEvent(){
    this.eventService.GetAllEvents()
    .subscribe((res) => {
        this.events = res
    });
  }
}