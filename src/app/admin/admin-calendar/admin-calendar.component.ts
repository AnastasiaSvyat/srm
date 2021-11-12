import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { EventService } from 'src/app/services/event/event.service';
import { AddEventComponent } from '../add-event/add-event.component';
import { Events } from 'src/app/model/Events';
import { Employee } from 'src/app/model/Employee';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-calendar',
  templateUrl: './admin-calendar.component.html',
  styleUrls: ['./admin-calendar.component.scss']
})
export class AdminCalendarComponent implements OnInit {
  today = new Date();
  haveEventsToday!: boolean;
  eventSelectedDate: Events[] = [];
  haveBirthToday!: boolean;
  birthSelectDate: Employee[] = [];
  selectedDate!: any;
  haveEventsPlannedToday!: boolean;
  haveEventsPlannedMonth!: boolean;
  eventsPlannedMonth: Events[] = [];
  eventsPlannedToday: Events[] = [];
  eventsPlannedLater: Events[] = [];
  duration = 5000;

  constructor(
    public dialog: MatDialog,
    private eventService: EventService,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.selectedDate = new Date();
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

  addEvent(): void {
    const dialogRef = this.dialog.open(AddEventComponent, {
      width: '398px',
      height: '591px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventService.AddEvent(result)
          .subscribe((res) => {
            this.snackBar.open('Congratulations! Event has been added!', '', {
              duration: this.duration
            });
            this.resetResults();
            this.getPlannedEvent();
            this.getEventSelectDate();
          }, (err) => {
            this.snackBar.open('Event was not added!', '', {
              duration: this.duration
            });
          }
          );
      }
    });
  }

  resetResults(){
    this.eventSelectedDate = [];
    this.birthSelectDate = [];
  }
}
