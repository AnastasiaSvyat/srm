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
  eventsPlannedTodayBool = false;
  eventsPlannedMonthBool = false;
  eventsPlannedMonth!:any;
  eventsPlannedToday!:any;
  
  constructor( public dialog: MatDialog,
    private eventService: EventService,
    private employeeService: EmployeeService,) { }
  
  ngOnInit(): void {
    this.onSelect(this.selectedDate);
    this.getEvent()
    this.getEmployee()
    this.getEventInPlanned()
}

  onSelect(event:any) {
    this.selectedDate = event;
    this.getEmployee()
    this.getEvent()
    console.log(this.today);
    
  }

 getEmployee(){
  this.employeeService.GetStaff()
  .subscribe((res) => {
    this.employee = res
    this.employee.forEach((employeeBirth:any) => {
      if(<any>moment(this.selectedDate).format('MMDD') == <any>moment(employeeBirth.birthday).format('MMDD')){
      this.birthToday.push(employeeBirth)
      this.birthTodayBool = true
      }else{
        this.birthToday = []
      this.birthTodayBool = false
      }
    })
  })
 } 

 getEventInPlanned(){
  this.eventService.GetAllEvents()
    .subscribe((res) => {
      this.events = res
      this.events.forEach((events:any) => {
        
        if(<any>moment(this.today).format('MMDD') == <any>moment(events.date).format('MMDD')){
        this.eventsPlannedToday.push(events)
        this.eventsPlannedTodayBool = true
        console.log(this.eventsPlannedToday);
        
        }else{
          this.eventsPlannedToday = []  
          this.eventsPlannedTodayBool = false
        }
        if(<any>moment(this.today).format('MM') == <any>moment(events.date).format('MM')){
          this.eventsPlannedMonth.push(events)
          this.eventsPlannedMonthBool = true;
        }else{
          this.eventsPlannedMonthBool = false;
          this.eventsPlannedMonth = []
        }
      })
    })
 }

  getEvent(){
    this.eventService.GetAllEvents()
    .subscribe((res) => {
      this.events = res
      this.events.forEach((eventsToday:any) => {
        if(<any>moment(this.selectedDate).format('MMDD') == <any>moment(eventsToday.date).format('MMDD')){
        this.eventsToday.push(eventsToday)
        this.eventsTodayBool = true
        console.log(this.eventsToday);
        
        }else{
          this.eventsToday = []  
          this.eventsTodayBool = false
        }
        if(<any>moment(this.selectedDate).format('MM') == <any>moment(eventsToday.date).format('MM')){
          this.eventsMonth.push(eventsToday)
          this.eventsMonthBool = true;
        }else{
          this.eventsMonthBool = false;
          this.eventsMonth = []
        }
      })
    })
  }
  }
