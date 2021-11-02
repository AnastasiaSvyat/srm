import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import * as moment from 'moment';
import { EventService } from 'src/app/services/event/event.service';

@Component({
  selector: 'app-user-calendar',
  templateUrl: './user-calendar.component.html',
  styleUrls: ['./user-calendar.component.scss']
})
export class UserCalendarComponent implements OnInit {
  today = new Date()
  events!:any
  employee!:any
  eventsMonth:any = []
  eventsMonthBool!:boolean
  eventsTodayBool!:boolean
  eventsToday:any = []
  birthTodayBool!:boolean
  birthToday:any = []
  selectedDate = new Date();
  eventsPlannedTodayBool!:boolean;
  eventsPlannedMonthBool!:boolean;
  eventsPlannedMonth:any
  eventsPlannedToday:any
  eventsPlanned!:any

  
  constructor( public dialog: MatDialog,
    private eventService: EventService,
    private employeeService: EmployeeService,) { 
  }

  ngOnInit(): void {
    this.selectedDate = this.today
    this.onSelect(this.selectedDate);
    // this.getEmployee()
    // this.getEvent()

    this.getPlannedEvent()

  }

  onSelect(event:any) {
    this.selectedDate = event;
    this.resetResults()
    this.getEmployee()
    this.getEvent()
  }

 getEmployee(){
  this.birthTodayBool = false
  this.employeeService.GetStaff()
  .subscribe((res) => {    
    this.employee = res
    this.employee.forEach((employeeBirth:any) => {
      if(<any>moment(this.selectedDate).format('MMDD') == <any>moment(employeeBirth.date).format('MMDD')){
        this.birthToday.push(employeeBirth)
        this.birthTodayBool = true
      }
    })
  })
} 
getPlannedEvent(){
  this.getEventDayPlanned()
  this.getEventMonthPlanned()
  this.getEventPlanned()
}

getEventDayPlanned(){
  this.eventService.GetAllEventToday()
  .subscribe((res) => {
    this.eventsPlannedToday = res
    if(this.eventsPlannedToday.length > 0){
      this.eventsPlannedTodayBool = true
    }
  })
}

getEventMonthPlanned(){
  this.eventService.GetEventMonth()
  .subscribe((res) => {
    this.eventsPlannedMonth = res
    if(this.eventsPlannedMonth.length > 0){
      this.eventsPlannedMonthBool = true
      this.sortArr(this.eventsPlannedMonth)
    }
  })
}


sortArr(arr:any){
  const today = new Date()
  arr.sort(function(a:any,b:any){
    return (<any>moment(today).format('MMDD') - <any>moment(b.date).format('MMDD')) - (<any>moment(today).format('MMDD') - <any>moment(a.date).format('MMDD'))
  })
}

getEventPlanned(){
  this.eventService.GetAllEvents()
  .subscribe((res) => {
      this.eventsPlanned = res
      if(this.eventsPlanned.length > 0){
      }
      this.sortArr(this.eventsPlanned)
  });
}


  getEvent(){
    this.eventsTodayBool = false
    this.eventsMonthBool = false;
    this.eventService.GetAllEvents()
    .subscribe((res) => {
      this.events = res
      this.events.forEach((ev:any) => {
        if(<any>moment(this.selectedDate).format('MMDD') == <any>moment(ev.date).format('MMDD')){
          this.eventsToday.push(ev)
          this.eventsTodayBool = true
        }
      })
    })
  }

  resetResults(){
    this.eventsToday = []  
    this.birthToday = []
  }
}