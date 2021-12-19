import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { EventService } from 'src/app/services/event/event.service';
import { AddEventComponent } from '../add-event/add-event.component';
import { Events } from 'src/app/model/Events';
import { Employee } from 'src/app/model/Employee';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-admin-calendar',
  templateUrl: './admin-calendar.component.html',
  styleUrls: ['./admin-calendar.component.scss']
})
export class AdminCalendarComponent implements OnInit {
  today = new Date();
  eventSelectedDate: Events[] = [];
  birthSelectDate: Employee[] = [];
  selectedDate!: any;
  eventsPlannedMonth: Events[] = [];
  eventsPlannedToday: Events[] = [];
  eventsPlannedLater: Events[] = [];
  duration = 5000;

  constructor(
    public dialog: MatDialog,
    private eventService: EventService,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    private overlay: Overlay) {
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

  addEvent(): void {
    const dialogRef = this.dialog.open(AddEventComponent, {
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      width: '398px',
      minHeight: '491px',
      height: 'auto'
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

  resetResults() {
    this.eventSelectedDate = [];
    this.birthSelectDate = [];
  }
}
