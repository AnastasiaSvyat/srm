import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { EventService } from 'src/app/services/event/event.service';
import { AddEventComponent } from '../add-event/add-event.component';
import * as moment from 'moment';
import { Events } from 'src/app/model/Events';
import { Employee } from 'src/app/model/Employee';

@Component({
  selector: 'app-admin-calendar',
  templateUrl: './admin-calendar.component.html',
  styleUrls: ['./admin-calendar.component.scss']
})
export class AdminCalendarComponent implements OnInit {
  today = new Date();
  eventsList: Events[] = [];
  employee: Employee[] = [];
  haveEventsToday!: boolean;
  eventSelectedDate: Events[] = [];
  haveBirthToday!: boolean;
  birthSelectDate: Employee[] = [];
  selectedDate = new Date();
  haveEventsPlannedToday!: boolean;
  haveEventsPlannedMonth!: boolean;
  eventsPlannedMonth: Events[] = [];
  eventsPlannedToday: Events[] = [];
  eventsPlannedLater: Events[] = [];


  constructor(
    public dialog: MatDialog,
    private eventService: EventService,
    private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.onSelect(this.selectedDate);
    this.getPlannedEvent();
  }

  onSelect(event: any) {
    this.selectedDate = event;
    this.resetResults();
    this.getEmployee();
    this.getEvent();
  }

  getEmployee() {
    this.haveBirthToday = false;
    this.employeeService.GetStaff()
      .subscribe((res) => {
        this.employee = res;
        this.employee.forEach((employeeBirth: any) => {
          if ((moment(this.selectedDate).format('MMDD') as any) === (moment(employeeBirth.date).format('MMDD') as any)) {
            this.birthSelectDate.push(employeeBirth);
            this.haveBirthToday = true;
          }
        });
      });
  }

  getEvent() {
    this.haveEventsToday = false;
    this.eventService.GetAllEvents()
      .subscribe((res) => {
        this.eventsList = res;
        this.eventsList.forEach((ev: any) => {
          if ((moment(this.selectedDate).format('MMDD') as any) === (moment(ev.date).format('MMDD') as any)) {
            this.eventSelectedDate.push(ev);
            this.haveEventsToday = true;
          }
        });
      });
  }

  getPlannedEvent() {
    this.getEventDayPlanned();
    this.getEventMonthPlanned();
    this.getEventPlannedLater();
  }

  getEventDayPlanned() {
    this.eventService.GetAllEventToday()
      .subscribe((res) => {
        this.eventsPlannedToday = res;
        if (this.eventsPlannedToday.length > 0) {
          this.haveEventsPlannedToday = true;
        }
      });
  }

  getEventMonthPlanned() {
    this.eventService.GetEventMonth()
      .subscribe((res) => {
        this.eventsPlannedMonth = res;
        if (this.eventsPlannedMonth.length > 0) {
          this.haveEventsPlannedMonth = true;
        }
      });
  }

  getEventPlannedLater() {
    this.eventService.GetEventsLater()
      .subscribe((res) => {
        this.eventsPlannedLater = res;
      });
  }

  addEvent(): void {
    const dialogRef = this.dialog.open(AddEventComponent, {
      width: '398px',
      height: '591px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventService.AddEvent(result)
          .subscribe((res) => {
            // MaterialService.toast('Congratulations! Event has been added!');
            this.resetResults();
            this.getPlannedEvent();
            this.getEvent();
          }, (err) => {
            // MaterialService.toast('This event is already exists. Try another one.');
          });
      }
    });
  }

  resetResults() {
    this.eventSelectedDate = [];
    this.birthSelectDate = [];
  }
}
