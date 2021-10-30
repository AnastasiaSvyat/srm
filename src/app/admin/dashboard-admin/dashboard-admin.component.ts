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
import { MaterialService } from 'src/app/services/material/material.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {
  employee:any = []
  toDoListToday:any
  toDoListWeek:any
  toDoListTomorrow:any
  haveTaskToday:boolean = false
  haveTaskTomorrow:boolean = false
  haveTaskWeek:boolean = false

  events!:any
  staff!:any
  isChecked:boolean = false;
  monthBirth:any
  todayBirth:any
  haveBirthToday:boolean = false
  haveBirthMonth:boolean = false
  haveEventToday:boolean = false
  haveEventMonth:boolean = false
  noHaveEvent:boolean = false
  idCheckBox!:any
  deleteArr:any = []
  today!:any
  head!:any
  dateAll!:any
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
  eventDay!:any
  eventMonth!:any


constructor(public dialog: MatDialog,
    private service:DataEmployeeService,
    private eventService: EventService,
    private emoloyeeService:EmployeeService,
    private taskService: ToDoListService) {
}
 
ngOnInit(): void {
    this.getUser()
    this.getEvent()
    this.getAllTask()
    this.getAllEvent()
    this.emoloyeeService.GetStaff()
    this.today = new Date()
    this.getAllBirth()
    this.emoloyeeService.GetEmplBirthToday()}

addResult(result:any){
  result.month = <any>moment(result.date).format('MM')
  result.year = <any>moment(result.date).format('YY')
  result.day = <any>moment(result.date).format('DD')
  result.week = <any>moment(result.date).format('WW')
}

// USER

getUser(){
  this.service.data.subscribe(res => {
    this.employee = res
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

// TASK

onChange($event:any,task:any){
  this.idCheckBox = $event.target.value
  this.isChecked = $event.target.checked
  if(this.isChecked){
    this.deleteArr.push(task)
  }else{
    this.deleteArr.splice(task.id, 1);
  }
}

deleteTask(id:any) {
  console.log(id);
    this.taskService.DeleteTask(id).subscribe((res) => {
      this.getAllTask()
    })
}

getAllTask(){
  this.getTaskDay()
  this.getTaskWeek()
  this.getTaskTomorrow()
}

getTaskDay(){
  this.taskService.GetAllTaskDate()
  .subscribe((res) => {
    this.toDoListToday = res
    console.log(this.toDoListToday.length);
    
    if(this.toDoListToday.length > 0){
      this.haveTaskToday = true
      console.log(this.haveTaskToday);
      
    }else{
      this.haveTaskToday = false

    }

    console.log(this.haveTaskToday);

  })
}
 
getTaskWeek(){
  this.taskService.GetAllTaskWeek()
  .subscribe((res) => {
    this.toDoListWeek = res
    if(this.toDoListWeek.length > 0){
      this.haveTaskWeek = true
    }else{
      this.haveTaskWeek = false
    }
  })
}

getTaskTomorrow(){
  this.taskService.GetAllTaskTomorrow()
  .subscribe((res) => {
    this.toDoListTomorrow = res
    if(this.toDoListTomorrow.length > 0){
      this.haveTaskTomorrow = true
    }else{
      this.haveTaskTomorrow = false
    }
  })
}



addTask(): void {
  const dialogRef = this.dialog.open(AddTaskComponent, {
    width: '398px',
    height :'361px',
    data: {head: "Add task:",btn:"ADD",}

  });
  dialogRef.afterClosed().subscribe(result => {
    this.addResult(result)
      this.taskService.AddTask(result)
      .subscribe((res) => {
        console.log(res);
        this.getAllTask()
      })
      });
}

updateTask(event:any): void {
const dialogRef = this.dialog.open(AddTaskComponent, {
  width: '398px',
  height :'361px',
  data: {head: "Edit task:",btn: "EDIT",dateAll:event.dateAll,task:event.task}
});
dialogRef.afterClosed().subscribe(result => {
  this.editTask = result;
  this.taskService.UpdateTask(event._id,this.editTask)
    this.getAllTask()
});
}


// EVENT
  
addEvent(): void {
    const dialogRef = this.dialog.open(AddEventComponent, {
      width: '398px',
      height :'591px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.addResult(result)
      this.eventService.AddEvent(result)
      .subscribe((res) => {
        MaterialService.toast("Congratulations! Event has been added!")
          this.getAllEvent()
      }, (err) => {
        MaterialService.toast("This event is already exists. Try another one.")
      });
    });
}

getAllEvent(){
  this.getEventDay()
  this.getEventMonth()
  this.getEvent()
}

getEventDay(){
  this.eventService.GetAllEventToday()
  .subscribe((res) => {
    this.eventDay = res
    if(this.eventDay.length > 0){
      this.haveEventToday = true
    }
  })
}

getEventMonth(){
  this.eventService.GetEventMonth()
  .subscribe((res) => {
    this.eventMonth = res
    if(this.eventMonth.length > 0){
      this.haveEventMonth = true
    }
  })
}

getEvent(){
  this.eventService.GetAllEvents()
  .subscribe((res) => {
      this.events = res
      if(this.events.length > 0){
        this.noHaveEvent = true
      }
      const today = new Date()
        this.events.sort(function(a:any,b:any){
          return (<any>moment(today).format('MMDD') - <any>moment(b.date).format('MMDD')) - (<any>moment(today).format('MMDD') - <any>moment(a.date).format('MMDD'))
        })
  });
}

// BIRTH

getAllBirth(){
  this.getBirthDay()
  this.getBirthMonth()
  this.getBirth()
}

getBirthDay(){
  this.emoloyeeService.GetEmplBirthToday()
    .subscribe((res) => {
    this.todayBirth = res
    if(this.todayBirth.length > 0){
      this.haveBirthToday = true
    }
  })
}

getBirthMonth(){
  this.emoloyeeService.GetEmplBirthMonth()
    .subscribe((res) => {
    this.monthBirth = res
    if(this.monthBirth.length > 0){
      this.haveBirthMonth = true
    }
  })
}

getBirth(){
  this.emoloyeeService.GetStaff()
  .subscribe((res) => {
      this.staff = res
      const today = new Date()
      this.staff.sort(function(a:any,b:any){
        return (<any>moment(today).format('MMDD') - <any>moment(b.birthday).format('MMDD')) - (<any>moment(today).format('MMDD') - <any>moment(a.birthday).format('MMDD'))
      })
  })
}
}