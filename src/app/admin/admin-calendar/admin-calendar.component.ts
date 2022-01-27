import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { EventService } from 'src/app/services/event/event.service';
import { AddEventComponent } from '../add-event/add-event.component';
import { Events } from 'src/app/model/Events';
import { Employee } from 'src/app/model/Employee';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { AuthService } from 'src/app/services/auth/auth.service';

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

  employee!: Employee;

  constructor(
    public dialog: MatDialog,
    private eventService: EventService,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    private overlay: Overlay,
    private auth: AuthService,
    ) {
  }

  ngOnInit(): void {
    this.selectedDate = new Date();
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
      height: 'auto',
      disableClose: true,
      data: { head: 'Add event:', btn: 'ADD', eventData: '' }
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
        console.log(res);
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

  editChoose(event: any) {
    console.log(event);
    if (event.decline.indexOf(this.employee.id) !== -1) {
      event.decline.splice(event.decline.indexOf(this.employee.id), 1);
      console.log(event.decline);
    }
    if (event.confirm.indexOf(this.employee.id) !== -1) {
      event.confirm.splice(event.confirm.indexOf(this.employee.id), 1);
      console.log(event.confirm);
    }
    this.eventService.UpdateEvent(event._id, event)
      .subscribe((res) => {
        // console.log(res);
      });
  }


  resetResults() {
    this.eventSelectedDate = [];
    this.birthSelectDate = [];
  }
}
