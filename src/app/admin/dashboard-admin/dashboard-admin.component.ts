import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
import { UploadPhotoService } from 'src/app/services/uploadPhoto/upload-photo.service';
import { UploadPhoto } from 'src/app/model/UploadPhoto';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Overlay } from '@angular/cdk/overlay';

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
  isChecked!: boolean;
  monthBirthList: Employee[] = [];
  todayBirthList: Employee[] = [];
  today = new Date();
  eventDayList: Events[] = [];
  eventMonthList: Events[] = [];
  vacationMonthList: Request[] = [];
  vacationLaterList: Request[] = [];
  eventLaterList: Events[] = [];
  staffBirthLater: Employee[] = [];
  urlPhoto!: string;
  photoStaffArr: UploadPhoto[] = [];

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    private eventService: EventService,
    private emoloyeeService: EmployeeService,
    private requestService: RequestService,
    private uploadPhotoService: UploadPhotoService,
    private taskService: ToDoListService,
    private overlay: Overlay) {
  }

  ngOnInit(): void {
    this.employee = this.auth.user;
    this.emoloyeeService.GetEmployee(this.employee.id)
      .subscribe((res) => {
        this.employee = res;
      });
    this.getLoginEmployeePhoto();
    this.getPhotoEmployee();
    this.getAllTask();
    this.getAllEvent();
    this.emoloyeeService.GetStaff();
    this.getAllBirth();
    this.getAllVacations();
  }

  // PHOTO

  getLoginEmployeePhoto() {
    this.uploadPhotoService.GetPhotoById(this.employee.id)
      .subscribe((res) => {
        if (res) {
          this.urlPhoto = res.imagePath;
        }
      });
  }

  getPhotoEmployee() {
    this.uploadPhotoService.GetPhoto()
      .subscribe((res) => {
        this.photoStaffArr = res;
      });
  }

  getEmployeePhotoById(userId: string) {
    const imgResult = this.photoStaffArr.find(img => img.idEmployee === userId);
    return imgResult?.imagePath ?? '../../../assets/img/nouser.jpeg';
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

  editUser(event: Employee): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '398px',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      minHeight: '100px',
      height: 'auto',
      data: {
        head: 'Edit user:',
        btn: 'SAVE',
        changeUser: event,
        showArhiveUser: false,
        showCV: true,
        showLastPerf: true,
        showPassword: false,
        showRole: false,
        addCV: 'Add new CV',
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employee = result;
        this.getAllBirth();
        this.getLoginEmployeePhoto();
        this.getPhotoEmployee();
      }
    });
  }

  // TASK

  onChange($event: any, task: any) {
    this.isChecked = $event.checked;
    console.log($event);
    task.select = this.isChecked;
    console.log(task);
    if (this.isChecked) {
      this.taskService.DeleteTask(task._id)
        .subscribe((res) => {
          console.log(res);
        });
    } else {
      this.taskService.AddTask(task)
        .subscribe((res) => {
          console.log(res);
        });
    }
  }

  deleteTask(event: ToDoList) {
    this.taskService.DeleteTask(event.id).subscribe((res) => {
      this.getAllTask();
    });
  }

  getAllTask() {
    this.getTaskDay();
    this.getTaskWeek();
    this.getTaskTomorrow();
  }

  getTaskDay() {
    this.taskService.GetAllTaskDate(this.employee)
      .subscribe((res) => {
        this.toDoListToday = res;
      });
  }

  getTaskWeek() {
    this.taskService.GetAllTaskWeek(this.employee)
      .subscribe((res) => {
        this.toDoListWeek = res;
      });
  }

  getTaskTomorrow() {
    this.taskService.GetAllTaskTomorrow(this.employee)
      .subscribe((res) => {
        this.toDoListTomorrow = res;
      });
  }

  addTask(): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '398px',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      minHeight: '361px',
      height: 'auto',
      data: { head: 'Add task:', btn: 'ADD', eventData: '' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllTask();
      }
    });
  }

  updateTask(event: ToDoList): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '398px',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      minHeight: '361px',
      height: 'auto',
      data: { head: 'Edit task:', btn: 'EDIT', eventData: event }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllTask();
      }
    });
  }

  // EVENT

  addEvent(): void {
    const dialogRef = this.dialog.open(AddEventComponent, {
      width: '398px',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      minHeight: '591px',
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllEvent();
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
        this.eventDayList = res;
      });
  }

  getEventMonth() {
    this.eventService.GetEventMonth()
      .subscribe((res) => {
        this.eventMonthList = res;
      });
  }

  getEventLater() {
    this.eventService.GetEventsLater()
      .subscribe((res) => {
        this.eventLaterList = res;
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
        this.todayBirthList = res;
      });
  }

  getBirthMonth() {
    this.emoloyeeService.GetEmplBirthMonth()
      .subscribe((res) => {
        this.monthBirthList = res;
      });
  }

  getBirth() {
    this.emoloyeeService.GetEmplBirthLater()
      .subscribe((res) => {
        this.staffBirthLater = res;
      });
  }
}
