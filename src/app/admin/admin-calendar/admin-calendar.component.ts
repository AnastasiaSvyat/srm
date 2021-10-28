import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { EventService } from 'src/app/services/event/event.service';
import { AddEventComponent } from '../add-event/add-event.component';
import * as moment from 'moment';

@Component({
  selector: 'app-admin-calendar',
  templateUrl: './admin-calendar.component.html',
  styleUrls: ['./admin-calendar.component.scss']
})
export class AdminCalendarComponent implements OnInit {
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
  eventsPlannedMonth:any = [];
  eventsPlannedToday:any = [];

  
  constructor( public dialog: MatDialog,
    private eventService: EventService,
    private employeeService: EmployeeService,) { 
  }

  ngOnInit(): void {
    this.selectedDate = this.today
    this.onSelect(this.selectedDate);
    this.getEmployee()
    this.getEventInPlanned()
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
      if(<any>moment(this.selectedDate).format('MMDD') == <any>moment(employeeBirth.birthday).format('MMDD')){
        this.birthToday.push(employeeBirth)
        this.birthTodayBool = true
      }
    })
  })
} 

 getEventInPlanned(){
  this.eventsPlannedTodayBool = false
  this.eventsPlannedMonthBool = false;
  this.eventService.GetAllEvents()
    .subscribe((res) => {
      this.events = res
      this.events.forEach((events:any) => {
        if(<any>moment(this.today).format('MMDD') == <any>moment(events.date).format('MMDD')){
          this.eventsPlannedToday.push(events)
          this.eventsPlannedTodayBool = true
        }
        if(<any>moment(this.today).format('MM') == <any>moment(events.date).format('MM')){
          this.eventsPlannedMonth.push(events)
          this.eventsPlannedMonthBool = true;
        }else{
          this.eventsPlannedMonth = []
        }
      })
    })
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
        if(<any>moment(this.selectedDate).format('MM') == <any>moment(ev.date).format('MM')){
          this.eventsMonth.push(ev)
          this.eventsMonthBool = true;
        }
      })
    })
  }

  addEvent() : void {
    const dialogRef = this.dialog.open(AddEventComponent, {
      width: '398px',
      height :'591px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getEvent()
    });
  }

  resetResults(){
    this.eventsToday = []  
    this.birthToday = []
    this.eventsMonth = []
  }
}