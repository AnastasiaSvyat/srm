import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import * as moment from 'moment';
import { DataEmployeeService } from 'src/app/services/dataEmployee/dataEmployee.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { EventService } from 'src/app/services/event/event.service';
import { ToDoListService } from 'src/app/services/toToList/to-do-list.service';
import { AddEventComponent } from '../add-event/add-event.component';
import { AddTaskComponent } from '../add-task/add-task.component';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {
  employee:any = []
  toDoList:any = []
  events!:any
  staff!:any
  id!:any;
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
  today!:any
  eventsToday:any = []
  head!:any
  date!:any
  task!:any
  btn!:any
  editTask!:any
  arr:any = []
  updateUser!:any
  changeUser!:any
  lastPerf!:any
  arhiveUser!:any
  addCV!:any
  lastPerfBool!:boolean
  passBool!:boolean
  roleBool!:boolean
  addCVBool!:boolean


constructor(public dialog: MatDialog,
    private service:DataEmployeeService,
    private eventService: EventService,
    private emoloyeeService:EmployeeService,
    private taskService: ToDoListService) {
}
 
ngOnInit(): void {
    this.service.data.subscribe(res => {
      this.employee = res
    });
    this.id = this.employee.id
    this.getEvent()
    this.getEmployee()
    this.getAllTask()
    this.getUser()
    this.emoloyeeService.GetStaff()
    this.today = new Date()
  }

  getUser(){
    this.emoloyeeService.GetEmployee(this.id)
      .subscribe(value => {
        this.employee = value
      });
}

onChange($event:any,task:any){
  this.idCheckBox = $event.target.value
  this.isChecked = $event.target.checked
  if(this.isChecked){
    this.deleteArr.push(task)
  }else{
    this.deleteArr.splice(task.id, 1);
  }
}

deleteTask(id:any, i:any) {
  console.log(id);
    this.taskService.DeleteTask(id).subscribe((res) => {
      this.toDoList.splice(i, 1);
    })
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

editUser(event:any): void {
  const dialogRef = this.dialog.open(AddUserComponent, {
    width: '398px',
    height :'670px',
    data: {head: "Edit user:",btn: "SAVE",changeUser:event,
    lastPerf:false,arhiveUser:false,addCVBool:false,lastPerfBool:true,
    passBool:false, roleBool:false,}
  });
  dialogRef.afterClosed().subscribe(result => {
    this.updateUser = result;
    this.emoloyeeService.updateEmployee(event.id,this.updateUser)
        .subscribe(
          success => {
            this.emoloyeeService.GetEmployee(event.id)
            .subscribe((res) => {
              this.employee = res
            })
          },
          error => console.log(error));
  });
}

getAllTask(){
  this.taskService.GetAllTask()
  .subscribe((res) => {
    this.toDoList = res
  })
}

addTask(): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '398px',
      height :'361px',
      data: {head: "Add task:",btn:"ADD",}
  
    });
    dialogRef.afterClosed().subscribe(result => {
    this.taskService.AddTask(result)
    .subscribe((res) => {
    })
      this.getAllTask()
    });
}

updateTask(event:any): void {
  const dialogRef = this.dialog.open(AddTaskComponent, {
    width: '398px',
    height :'361px',
    data: {head: "Edit task:",btn: "EDIT",date:event.date,task:event.task}
  });
  dialogRef.afterClosed().subscribe(result => {
    this.editTask = result;
    this.taskService.UpdateTask(event._id,this.editTask)
        .subscribe(
          success => console.log("Done"),
          error => console.log(error));
      this.getAllTask()
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
    this.emoloyeeService.GetStaff()
    .subscribe((res) => {
        this.staff = res
        this.getStaffBirthdayTodayOrMonth()
        this.getEventTodayOrMonth()
        const today = new Date()
        this.staff.sort(function(a:any,b:any){
          return (<any>moment(today).format('MMDD') - <any>moment(b.birthday).format('MMDD')) - (<any>moment(today).format('MMDD') - <any>moment(a.birthday).format('MMDD'))
        })
    })
}

getStaffBirthdayTodayOrMonth(){
this.staff.forEach((employeeBirth:any) => {
    if(<any>moment(this.today).format('MMDD') == <any>moment(employeeBirth.birthday).format('MMDD')){
     this.haveBirthToday = true;
      this.todayBirth.push(employeeBirth)
    }else{
     this.haveBirthToday = false;
     this.todayBirth = [];
    }
    if(<any>moment(this.today).format('MM') == <any>moment(employeeBirth.birthday).format('MM')){
      this.monthBirth.push(employeeBirth)
      this.haveBirthMonth = true;
    }else{
      this.haveBirthMonth = false;
      this.monthBirth = []
    }
  });
}

getEventTodayOrMonth(){
  console.log(this.events);
  
  this.events.forEach((eventToday:any) => {
  if(<any>moment(this.today).format('MMDD') == <any>moment(eventToday.date).format('MMDD')){
   this.haveEventToday = true;
   this.todayEvent.push(eventToday)
  }else{
   this.haveEventToday = false;
   this.todayEvent = [];
  }
  if(<any>moment(this.today).format('MM') == <any>moment(eventToday.date).format('MM')){
    this.monthEvent.push(eventToday)
    this.haveEventMonth = true;
  }else{
    this.haveEventMonth = false;
    this.monthEvent = []
  }
});
}
}