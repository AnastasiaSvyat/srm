import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataEmployeeService } from 'src/app/services/dataEmployee/dataEmployee.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { EventService } from 'src/app/services/event/event.service';
import { ToDoListService } from 'src/app/services/toToList/to-do-list.service';
import { AddEventComponent } from '../add-event/add-event.component';
import { AddTaskComponent } from '../add-task/add-task.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { RequestService } from 'src/app/services/request/request.service';
import { Employee } from 'src/app/model/Employee';
import { ToDoList } from 'src/app/model/ToDoList';
import { Events } from 'src/app/model/Events';
import { Request } from 'src/app/model/Request';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {
  employee!: Employee;
  toDoListToday: ToDoList[] = [];
  toDoListWeek: ToDoList[] = [];
  toDoListTomorrow: ToDoList[] = [];
  haveTaskToday!: boolean;
  haveTaskTomorrow!: boolean;
  haveTaskWeek!: boolean;
  eventsList: Events[] = [];
  isChecked!: boolean;
  monthBirthList: Employee[] = [];
  todayBirthList: Employee[] = [];
  haveBirthToday!: boolean;
  haveBirthMonth!: boolean;
  haveEventToday!: boolean;
  haveEventMonth!: boolean;
  noHaveEvent!: boolean;
  idCheckBox!: any;
  today = new Date();
  editTask: ToDoList[] = [];
  updateUser: Employee[] = [];
  eventDayList: Events[] = [];
  eventMonthList: Events[] = [];
  vacationMonthList: Request[] = [];
  vacationLaterList: Request[] = [];
  eventLaterList: Events[] = [];
  staffBirthLater: Employee[] = [];


  constructor(
    public dialog: MatDialog,
    private service: DataEmployeeService,
    private eventService: EventService,
    private emoloyeeService: EmployeeService,
    private requestService: RequestService,
    private taskService: ToDoListService) {
    this.haveTaskToday = false;
    this.haveTaskTomorrow = false;
    this.haveTaskWeek = false;
    this.isChecked = false;
    this.haveBirthToday = false;
    this.haveBirthMonth = false;
    this.haveEventToday = false;
    this.haveEventMonth = false;
    this.noHaveEvent = false;

  }

  ngOnInit(): void {
    this.getUser();
    this.getAllTask();
    this.getAllEvent();
    this.emoloyeeService.GetStaff();
    this.getAllBirth();
    this.emoloyeeService.GetEmplBirthToday();
    this.getAllVacations();
  }

  // Vacations

  getVacationsMonth() {
    this.requestService.GetRequestConfirmMonth()
      .subscribe((res) => {
        this.vacationMonthList = res;
      });
  }

  getVacationsLater() {
    this.requestService.GetRequestConfirmLater()
      .subscribe((res) => {
        this.vacationLaterList = res;
      });
  }

  getAllVacations() {
    this.getVacationsMonth();
    this.getVacationsLater();
  }

  // USER

  getUser() {
    this.service.data.subscribe(res => {
      this.employee = res;
    });
  }

  editUser(event: any): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '398px',
      height: '884px',
      data: {
        head: 'Edit user:',
        btn: 'SAVE',
        changeUser: event,
        showArhiveUser: false,
        showCV: true,
        showLastPerf: true,
        showPassword: false,
        showRole: false,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateUser = result;
        this.emoloyeeService.updateEmployee(event.id, this.updateUser)
          .subscribe(
            success => {
              this.emoloyeeService.GetEmployee(event.id)
                .subscribe((res) => {
                  this.employee = res;
                });
            },
            error => console.log(error));
      }
    });
  }

  // TASK

  onChange($event: any, task: any) {
    console.log(task);
    this.idCheckBox = $event.target.value;
    this.isChecked = $event.target.checked;
    if (this.isChecked) {
      this.taskService.DeleteTask(task._id)
        .subscribe((res) => {
          console.log(res);
        });
    }
  }

  deleteTask(id: any) {
    this.taskService.DeleteTask(id).subscribe((res) => {
      this.getAllTask();
    });
  }

  getAllTask() {
    this.getTaskDay();
    this.getTaskWeek();
    this.getTaskTomorrow();
  }

  getTaskDay() {
    this.taskService.GetAllTaskDate()
      .subscribe((res) => {
        console.log(res);
        this.toDoListToday = res;
        if (this.toDoListToday.length > 0) {
          this.haveTaskToday = true;
        }
      });
  }

  getTaskWeek() {
    this.taskService.GetAllTaskWeek()
      .subscribe((res) => {
        this.toDoListWeek = res;
        if (this.toDoListWeek.length > 0) {
          this.haveTaskWeek = true;
        }
      });
  }

  getTaskTomorrow() {
    this.taskService.GetAllTaskTomorrow()
      .subscribe((res) => {
        this.toDoListTomorrow = res;
        if (this.toDoListTomorrow.length > 0) {
          this.haveTaskTomorrow = true;
        }
      });
  }

  addTask(): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '398px',
      height: '361px',
      data: { head: 'Add task:', btn: 'ADD', }

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.AddTask(result)
          .subscribe((res) => {
            console.log(res);
            this.getAllTask();
          });
      }
    });
  }

  updateTask(event: any): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '398px',
      height: '361px',
      data: { head: 'Edit task:', btn: 'EDIT', dateAll: event.date, task: event.task }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editTask = result;
        this.taskService.UpdateTask(event.id, this.editTask);
        this.getAllTask();
      }
    });
  }


  // EVENT

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
            this.getAllEvent();
          }, (err) => {
            // MaterialService.toast('This event is already exists. Try another one.');
          });
      }
    });
  }

  getAllEvent() {
    this.getEventDay();
    this.getEventMonth();
    this.getEventLater();
  }

  getEventDay() {
    this.eventService.GetAllEventToday()
      .subscribe((res) => {
        console.log(res);
        this.eventDayList = res;
        if (this.eventDayList.length > 0) {
          this.haveEventToday = true;
        }
      });
  }

  getEventMonth() {
    this.eventService.GetEventMonth()
      .subscribe((res) => {
        console.log(res);
        this.eventMonthList = res;
        if (this.eventMonthList.length > 0) {
          this.haveEventMonth = true;
        }
      });
  }

  getEventLater() {
    this.eventService.GetEventsLater()
      .subscribe((res) => {
        console.log(res);
        this.eventLaterList = res;
        if (this.eventLaterList.length > 0) {
          this.noHaveEvent = true;
        }
      });
  }

  // BIRTH

  getAllBirth() {
    this.getBirthDay();
    this.getBirthMonth();
    this.getBirth();
  }

  getBirthDay() {
    this.emoloyeeService.GetEmplBirthToday()
      .subscribe((res) => {
        console.log(res);
        this.todayBirthList = res;
        if (this.todayBirthList.length > 0) {
          this.haveBirthToday = true;
        }
      });
  }

  getBirthMonth() {
    this.emoloyeeService.GetEmplBirthMonth()
      .subscribe((res) => {
        console.log(res);
        this.monthBirthList = res;
        if (this.monthBirthList.length > 0) {
          this.haveBirthMonth = true;
        }
      });
  }

  getBirth() {
    this.emoloyeeService.GetEmplBirthLater()
      .subscribe((res) => {
        console.log(res);
        this.staffBirthLater = res;
      });
  }
}
