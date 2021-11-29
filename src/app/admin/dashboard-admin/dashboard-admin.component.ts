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
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadPhotoService } from 'src/app/services/uploadPhoto/upload-photo.service';
import { UploadPhoto } from 'src/app/model/UploadPhoto';
import { UploadFileService } from 'src/app/services/UploadFile/upload-file.service';
import { UploadFile } from 'src/app/model/UploadFile';

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
  idCheckBox!: any;
  today = new Date();
  editTask: ToDoList[] = [];
  updateUser!: Employee;
  eventDayList: Events[] = [];
  eventMonthList: Events[] = [];
  vacationMonthList: Request[] = [];
  vacationLaterList: Request[] = [];
  eventLaterList: Events[] = [];
  staffBirthLater: Employee[] = [];
  duration = 5000;
  urlPhoto!: string;
  dataPhotoUpload!: UploadPhoto;
  dataCVUpload!: UploadFile;




  constructor(
    public dialog: MatDialog,
    private service: DataEmployeeService,
    private eventService: EventService,
    private emoloyeeService: EmployeeService,
    private requestService: RequestService,
    private uploadPhotoService: UploadPhotoService,
    private uploadCVService: UploadFileService,
    private taskService: ToDoListService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getUser();
    this.getAllTask();
    this.getAllEvent();
    this.emoloyeeService.GetStaff();
    this.getAllBirth();
    this.emoloyeeService.GetEmplBirthToday();
    this.getAllVacations();
    this.getPhotoEmployee();
  }

  getPhotoEmployee() {
    this.uploadPhotoService.GetPhotoByEmail(this.employee)
      .subscribe((res) => {
        if (res.length) {
          this.urlPhoto = res[0].imagePath;
        }
      });
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
        addCV: 'Add new CV',
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateUser = result[0];
        this.dataPhotoUpload = result[1];
        this.dataCVUpload = result[2];
        this.emoloyeeService.updateEmployee(event.id, this.updateUser)
          .subscribe(
            success => {
              this.emoloyeeService.GetEmployee(event.id)
                .subscribe((res) => {
                  this.employee = res;
                });
            },
            error => console.log(error));
        if (this.dataPhotoUpload.image != null) {
          this.uploadPhotoService.uploadPhoto(this.dataPhotoUpload.name, this.dataPhotoUpload.image, this.updateUser.email)
            .subscribe(success => {
              console.log(success);
              this.getPhotoEmployee();
            },
              error => console.log(error));
        }
        if (this.dataCVUpload.cv != null) {
          this.uploadCVService.uploadFile(this.dataCVUpload.name, this.dataCVUpload.cv, this.updateUser.email)
            .subscribe((res: any) => {
              console.log(res);
            });
        }
      }
    });
  }

  // TASK

  onChange($event: any, task: any) {
    this.idCheckBox = $event.target.value;
    this.isChecked = $event.target.checked;
    if (this.isChecked) {
      this.taskService.DeleteTask(task._id)
        .subscribe((res) => {
          console.log(res);
        });
    }
  }

  deleteTask(event: any) {
    this.taskService.DeleteTask(event._id).subscribe((res) => {
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
        this.toDoListToday = res;
      });
  }

  getTaskWeek() {
    this.taskService.GetAllTaskWeek()
      .subscribe((res) => {
        this.toDoListWeek = res;
      });
  }

  getTaskTomorrow() {
    this.taskService.GetAllTaskTomorrow()
      .subscribe((res) => {
        this.toDoListTomorrow = res;
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
        this.taskService.UpdateTask(event._id, this.editTask)
          .subscribe((res) => {
            console.log(res);
          });
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
          .subscribe(() => {
            this.snackBar.open('Congratulations! Event has been added!', '', {
              duration: this.duration
            });
            this.getAllEvent();
          }, (err) => {
            this.snackBar.open('This event was not added.', '', {
              duration: this.duration
            });
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
