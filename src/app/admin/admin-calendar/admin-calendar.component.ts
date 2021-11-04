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
  today = new Date();
  events!: any;
  employee!: any;
  eventsTodayBool!: boolean;
  eventsToday: any = [];
  birthTodayBool!: boolean;
  birthToday: any = [];
  selectedDate = new Date();
  eventsPlannedTodayBool!: boolean;
  eventsPlannedMonthBool!: boolean;
  eventsPlannedMonth: any = [];
  eventsPlannedToday: any = [];
  noHaveEvent!: any;
  eventsPlanned!: any;


  constructor( public dialog: MatDialog,
               private eventService: EventService,
               private employeeService: EmployeeService, ) {
  }

  ngOnInit(): void {
    this.selectedDate = this.today;
    this.onSelect(this.selectedDate);
    this.getPlannedEvent();
  }

  onSelect(event: any) {
    this.selectedDate = event;
    this.resetResults();
    this.getEmployee();
    this.getEvent();
  }

  addResult(result: any){
    result.month = (moment(result.date).format('MM') as any);
    result.year = (moment(result.date).format('YY') as any);
    result.day = (moment(result.date).format('DD') as any);
    result.week = (moment(result.date).format('WW') as any);
  }

  getEmployee(){
  this.birthTodayBool = false;
  this.employeeService.GetStaff()
  .subscribe((res) => {
    this.employee = res;
    this.employee.forEach((employeeBirth: any) => {
      if ((moment(this.selectedDate).format('MMDD') as any) === (moment(employeeBirth.date).format('MMDD') as any)){
        this.birthToday.push(employeeBirth);
        this.birthTodayBool = true;
      }
    });
  });
}

getEvent(){
  this.eventsTodayBool = false;
  this.eventService.GetAllEvents()
  .subscribe((res) => {
    this.events = res;
    this.events.forEach((ev: any) => {
      if ((moment(this.selectedDate).format('MMDD') as any) === (moment(ev.date).format('MMDD') as any)){
        this.eventsToday.push(ev);
        this.eventsTodayBool = true;
      }
    });
  });
}

getPlannedEvent(){
  this.getEventDayPlanned();
  this.getEventMonthPlanned();
  this.getEventPlanned();
}

getEventDayPlanned(){
  this.eventService.GetAllEventToday()
  .subscribe((res) => {
    this.eventsPlannedToday = res;
    if (this.eventsPlannedToday.length > 0){
      this.eventsPlannedTodayBool = true;
    }
  });
}

getEventMonthPlanned(){
  this.eventService.GetEventMonth()
  .subscribe((res) => {
    this.eventsPlannedMonth = res;
    if (this.eventsPlannedMonth.length > 0){
      this.eventsPlannedMonthBool = true;
      this.sortArr(this.eventsPlannedMonth);
    }
  });
}


sortArr(arr: any){
  const today = new Date();
  arr.sort((a: any, b: any) => {
    const first = (moment(today).format('MMDD') as any) - (moment(b.date).format('MMDD') as any);
    const second = (moment(today).format('MMDD') as any) - (moment(a.date).format('MMDD') as any);
    return first - second;
  });
}

getEventPlanned(){
  this.eventService.GetAllEvents()
  .subscribe((res) => {
      this.eventsPlanned = res;
      if (this.eventsPlanned.length > 0){
        this.noHaveEvent = true;
      }
      this.sortArr(this.eventsPlanned);
  });
}

addEvent(): void {
    const dialogRef = this.dialog.open(AddEventComponent, {
      width: '398px',
      height : '591px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.addResult(result);
      this.eventService.AddEvent(result)
      .subscribe((res) => {
      MaterialService.toast('Congratulations! Event has been added!');
      this.resetResults();
      this.getPlannedEvent();
      this.getEvent();
      }, (err) => {
        MaterialService.toast('This event is already exists. Try another one.');
      });
    });
  }

  resetResults(){
    this.eventsToday = [];
    this.birthToday = [];
  }
}
