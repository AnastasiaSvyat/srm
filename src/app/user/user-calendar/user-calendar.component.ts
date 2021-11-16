import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee/employee.service';
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
  birthSelectDate: Employee[] = [];
  selectedDate = new Date();
  eventsPlannedMonth: Events[] = [];
  eventsPlannedToday: Events[] = [];
  eventsPlannedLater: Events[] = [];


  constructor(
    public dialog: MatDialog,
    private eventService: EventService,
    private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.selectedDate = this.today;
    this.onSelect(this.selectedDate);
    this.getPlannedEvent();

  }

  onSelect(event: any) {
    this.selectedDate = event;
    this.resetResults();
    this.getEmployeeBirthSelectDate();
    this.getEventSelectDate();
  }

  getEmployeeBirthSelectDate() {
    this.employeeService.GetSelectBirth(this.selectedDate)
      .subscribe((res) => {
        this.birthSelectDate = res;
      });
  }

  getEventSelectDate() {
    this.eventService.GetSelectEvents(this.selectedDate)
      .subscribe((res) => {
        this.eventSelectedDate = res;
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
      });
  }

  getEventMonthPlanned() {
    this.eventService.GetEventMonth()
      .subscribe((res) => {
        this.eventsPlannedMonth = res;
      });
  }


  getEventPlannedLater() {
    this.eventService.GetEventsLater()
      .subscribe((res) => {
        this.eventsPlannedLater = res;
      });
  }

  resetResults() {
    this.eventSelectedDate = [];
    this.birthSelectDate = [];
  }
}
