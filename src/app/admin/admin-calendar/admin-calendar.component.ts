import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Employee } from 'src/app/model/Employee';
import { Events } from 'src/app/model/Events';
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
  today!:any
  events!:any
  employee!:any
  eventsMonth:any = []
  eventsMonthBool!:boolean
  eventsTodayBool!:boolean
  eventsToday:any = []
  birthTodayBool!:boolean
  birthToday:any = []
  
  selectedDate = new Date();

  DayAndDate!: string;
  constructor( public dialog: MatDialog,
    private eventService: EventService,
    private employeeService: EmployeeService,
     ) { 
  }

  ngOnInit(): void {
    this.onSelect(this.selectedDate);
    this.today = new Date()
    this.getEvent()
    this.getEmployee()
  }

  onSelect(event:any) {
    this.selectedDate = event;
    this.getEmployee()
    this.getEvent()
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

  addEvent() : void {
    const dialogRef = this.dialog.open(AddEventComponent, {
      width: '398px',
      height :'591px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getEvent()
    });
  }
}