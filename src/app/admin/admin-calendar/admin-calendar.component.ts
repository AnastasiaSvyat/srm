import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { EventService } from 'src/app/services/event/event.service';
import { AddEventComponent } from '../add-event/add-event.component';
import * as moment from 'moment';
import { MaterialService } from 'src/app/services/material/material.service';

@Component({
  selector: 'app-admin-calendar',
  templateUrl: './admin-calendar.component.html',
  styleUrls: ['./admin-calendar.component.scss']
})
export class AdminCalendarComponent implements OnInit {
  today = new Date()
  events!:any
  employee!:any
  eventsTodayBool!:boolean
  eventsToday:any = []
  birthTodayBool!:boolean
  birthToday:any = []
  selectedDate = new Date();
  eventsPlannedTodayBool!:boolean;
  eventsPlannedMonthBool!:boolean;
  eventsPlannedMonth:any = [];
  eventsPlannedToday:any = [];
  noHaveEvent!:any
  eventsPlanned!:any

  
  constructor( public dialog: MatDialog,
    private eventService: EventService,
    private employeeService: EmployeeService,) { 
  }

  ngOnInit(): void {
    this.selectedDate = this.today
    this.onSelect(this.selectedDate);
    this.getPlannedEvent()
  }

  onSelect(event:any) {
    this.selectedDate = event;
    this.resetResults()
    this.getEmployee()
    this.getEvent()
  }
  
  addResult(result:any){
    result.month = <any>moment(result.date).format('MM')
    result.year = <any>moment(result.date).format('YY')
    result.day = <any>moment(result.date).format('DD')
    result.week = <any>moment(result.date).format('WW')
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

getEvent(){
  this.eventsTodayBool = false
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
        this.noHaveEvent = true
      }
      this.sortArr(this.eventsPlanned)
  });
}

addEvent() : void {
    const dialogRef = this.dialog.open(AddEventComponent, {
      width: '398px',
      height :'591px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.addResult(result)
      this.eventService.AddEvent(result)
      .subscribe((res) => {
      MaterialService.toast("Congratulations! Event has been added!")
          this.resetResults()
          this.getPlannedEvent()
          this.getEvent()
      }, (err) => {
        MaterialService.toast("This event is already exists. Try another one.")
      });
    });
  }

  resetResults(){
    this.eventsToday = []  
    this.birthToday = []
  }
}