import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { EventService } from 'src/app/services/event/event.service';
import { Employee } from 'src/app/model/Employee';
import { Events } from 'src/app/model/Events';
import { AuthService } from 'src/app/services/auth/auth.service';

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
  employee!: Employee;
  confirmed!: boolean;
  declined!: boolean;
  events!: Events[];


  constructor(
    public dialog: MatDialog,
    private eventService: EventService,
    private employeeService: EmployeeService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.selectedDate = this.today;
    this.onSelect(this.selectedDate);
    this.getPlannedEvent();

    this.employee = this.auth.user;
    this.employeeService.GetEmployee(this.employee.id)
      .subscribe((res) => {
        this.employee = res;
      });
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

  actionEvent(action: boolean, event: any) {
    if (action) {
      event.confirm.push(this.employee.id);
      if (event.decline.indexOf(this.employee.id) !== -1) {
        event.decline.splice(event.decline.indexOf(this.employee.id), 1);
      }
    } else {
      event.decline.push(this.employee.id);
      if (event.confirm.indexOf(this.employee.id) !== -1) {
        event.confirm.splice(event.confirm.indexOf(this.employee.id), 1);
      }
    }
    this.eventService.UpdateEvent(event._id, event)
      .subscribe((res) => {
        // console.log(res);
      });
  }

  editChoose(event: any) {
    if (event.decline.indexOf(this.employee.id) !== -1) {
      event.decline.splice(event.decline.indexOf(this.employee.id), 1);
    }
    if (event.confirm.indexOf(this.employee.id) !== -1) {
      event.confirm.splice(event.confirm.indexOf(this.employee.id), 1);
    }
    this.eventService.UpdateEvent(event._id, event)
      .subscribe((res) => {
        // console.log(res);
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
    this.getAllEvent();
  }

  getAllEvent() {
    this.eventService.getEvents()
      .subscribe((res) => {
        // console.log(res);
      });
  }


  getConfirm(item: Events): any {
    if (item.confirm.includes(this.employee.id)) {
      return true;
    } else {
      return false;
    }
  }

  getDecline(item: Events): any {
    if (item.decline.includes(this.employee.id)) {
      return true;
    } else {
      return false;
    }
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
