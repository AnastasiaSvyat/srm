import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import * as moment from 'moment';
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
  staff!:any
  getId!:any;
  isChecked:boolean = false;
  monthBirth:any = []
  todayBirth:any = []
  haveBirthToday!:boolean
  haveBirthMonth!:boolean
  todayEvent:any = []
  monthEvent:any = []
  haveEventToday!:boolean
  haveEventMonth!:boolean
  idCheckBox!:any
  deleteArr:any = []


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
    this.getEmployee()
    this.getId = this.employee.userId
    this.emploeeService.GetStaff()
    
  }

onChange($event:any,task:any){
  console.log(task);
  
   this.idCheckBox = $event.target.value
   this.isChecked = $event.target.checked
   console.log(this.idCheckBox);
   console.log(this.isChecked);
   if(this.isChecked){
     this.deleteArr.push(task)
   }
   else{
    this.deleteArr.splice(task.id, 1);
   }
   console.log(this.deleteArr);
   
}

delete() {
  console.log(this.idCheckBox);
  console.log(this.isChecked);

  
    this.deleteArr.forEach((element:any,i:any) => {
      console.log(element);

      console.log(element.id);
      
      this.emploeeService.deleteEmployee(element.id).subscribe((res) => {
        this.employee.toDoList.splice(element, 1);
      })
    });
    
  
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
        console.log(this.events);
        
        const today = new Date()
          this.events.sort(function(a:any,b:any){
            return (<any>moment(today).format('MMDD') - <any>moment(b.date).format('MMDD')) - (<any>moment(today).format('MMDD') - <any>moment(a.date).format('MMDD'))
          })
    });
  }

getEmployee(){
    this.emploeeService.GetStaff()
    .subscribe((res) => {
        this.staff = res
        this.getStaffBirthdayTodayOrMonth()
        const today = new Date()
        this.staff.sort(function(a:any,b:any){
          return (<any>moment(today).format('MMDD') - <any>moment(b.birthday).format('MMDD')) - (<any>moment(today).format('MMDD') - <any>moment(a.birthday).format('MMDD'))
        })
    })
}

getStaffBirthdayTodayOrMonth(){
    const today = new Date()
    this.staff.forEach((employeeBirth:any) => {
    if(<any>moment(today).format('MMDD') == <any>moment(employeeBirth.birthday).format('MMDD')){
     this.haveBirthToday = true;
      this.todayBirth.push(employeeBirth)
    }else{
     this.haveBirthToday = false;
     this.todayBirth = [];
    }
    if(<any>moment(today).format('MM') == <any>moment(employeeBirth.birthday).format('MM')){
      this.monthBirth.push(employeeBirth)
      this.haveBirthMonth = true;
    }else{
      this.haveBirthMonth = false;
      this.monthBirth = []
    }
  });
}
getEventTodayOrMonth(){
  const today = new Date()
  this.staff.forEach((employeeBirth:any) => {
  if(<any>moment(today).format('MMDD') == <any>moment(employeeBirth.birthday).format('MMDD')){
   this.haveEventToday = true;
    this.todayEvent.push(employeeBirth)
  }else{
   this.haveEventToday = false;
   this.todayEvent = [];
  }
  if(<any>moment(today).format('MM') == <any>moment(employeeBirth.birthday).format('MM')){
    this.monthEvent.push(employeeBirth)
    this.haveEventMonth = true;
  }else{
    this.monthEvent = false;
    this.monthBirth = []
  }
});
}
}
