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
  haveEventsToday!: boolean;
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
    this.haveBirthToday = false;
    this.employeeService.GetSelectBirth(this.selectedDate)
      .subscribe((res) => {
        console.log(res);
        this.birthSelectDate = res;
        if (this.birthSelectDate.length > 0) {
          this.haveBirthToday = true;
        }
      });
  }

  getEventSelectDate() {
    this.haveEventsToday = false;
    this.eventService.GetSelectEvents(this.selectedDate)
      .subscribe((res) => {
        this.eventSelectedDate = res;
        if (this.eventSelectedDate.length > 0) {
          this.haveEventsToday = true;
        }
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

  resetResults() {
    this.eventSelectedDate = [];
    this.birthSelectDate = [];
  }
}
