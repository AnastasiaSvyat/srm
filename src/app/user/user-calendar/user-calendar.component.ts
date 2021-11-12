import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import * as moment from 'moment';
import { EventService } from 'src/app/services/event/event.service';
import { Employee } from 'src/app/model/Employee';
import { Events } from 'src/app/model/Events';

@Component({
  selector: 'app-user-calendar',
  templateUrl: './user-calendar.component.html',
  styleUrls: ['./user-calendar.component.scss']
})
export class UserCalendarComponent implements OnInit {
  today = new Date();
  eventSelectedDate: Events[] = [];
  employee: Employee[] = [];
  haveEventsToday!: boolean;
  eventsList: Events[] = [];
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
    private employeeService: EmployeeService) {}

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


  getEvent() {
    this.haveEventsToday = false;
    this.eventService.GetAllEvents()
      .subscribe((res) => {
        this.eventsList = res;
        this.eventsList.forEach((event: any) => {
          if ((moment(this.selectedDate).format('MMDD') as any) === (moment(event.date).format('MMDD') as any)) {
            this.eventSelectedDate.push(event);
            this.haveEventsToday = true;
          }
        });
      });
  }

  resetResults() {
    this.eventSelectedDate = [];
    this.birthSelectDate = [];
  }
}
