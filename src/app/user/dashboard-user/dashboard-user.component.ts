import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataEmployeeService } from 'src/app/services/dataEmployee/dataEmployee.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { RequestService } from 'src/app/services/request/request.service';
import { UploadFileService } from 'src/app/services/UploadFile/upload-file.service';
import { AddInfoUserComponent } from '../add-info-user/add-info-user.component';
import { UpdateUserComponent } from '../update-user/update-user.component';
import * as moment from 'moment';
import { EventService } from 'src/app/services/event/event.service';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})
export class DashboardUserComponent implements OnInit {
  fileName = '';
  employee: any = [];
  getId!: any;
  cv!: any;
  arr!: any;
  updateUser!: any;
  updateEmployee!: any;
  btn!: any;
  addCV!: any;
  head!: any;
  vacation!: any;
  vacationPlanned: any = [];
  eventMonth!: any;
  eventMonthBool!: boolean;
  monthBirth!: any;
  monthBirthBool!: boolean;
  eventMonthArr!: any;


  constructor(public dialog: MatDialog, private service: DataEmployeeService,
              private emoloyeeService: EmployeeService,
              private uploadFileService: UploadFileService,
              private requestService: RequestService,
              private eventService: EventService) {
      this.monthBirthBool = false;
    }

  ngOnInit(): void {
   this.getEmployee();
   this.getInfo();
   this.getUploadFile();
   this.getVacationsPlanned();
   this.getEventMonth();
  }

  getEmployee(){
    this.service.data.subscribe(value => {
      this.employee = value;
    });
    this.getId = this.employee.id;
  }

  getUploadFile(){
  this.uploadFileService.getUplFileByEmail(this.employee.email)
    .subscribe((res) => {
      this.arr = res;
      if (this.arr.length > 0){
        this.cv = res[res.length - 1];
        this.fileName = this.cv.name;
      }else{
        this.fileName = '';
        this.cv = [];
      }
    });
  }

  addNewInfo(): void {
    const dialogRef = this.dialog.open(AddInfoUserComponent, {
      width: '398px',
      height : '398px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getInfo();
    });
   }

  getInfo(){
    this.emoloyeeService.GetEmployee(this.getId)
      .subscribe(value => {
        this.employee = value;
      });
  }

  editUser(event: any): void {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      width: '398px',
      height : '670px',
      data: {head: 'Edit user:', btn: 'SAVE', updateEmployee: event,
      addCV: 'Add new CV'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getUploadFile();
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
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
        this.fileName = file.name;
        this.uploadFileService.uploadFile(this.employee, file)
      .subscribe((res) => {
        this.getUploadFile();
        if (this.cv.id !== undefined){
        this.deleteCV();
      }}, (err) => {
          console.log(err);
      });
    }
  }

  deleteCV(){
    this.uploadFileService.deleteUplFile(this.cv.id)
    .subscribe((res) => {
      this.getUploadFile();
    });
  }

  sortArr(arr: any){
    const today = new Date();
    arr.sort((a: any, b: any) => {
      const first = (moment(today).format('MMDD') as any) - (moment(b.date).format('MMDD') as any);
      const second = (moment(today).format('MMDD') as any) - (moment(a.date).format('MMDD') as any);
      return first - second;
    });
  }

  // vacation

  getVacationsPlanned(){
    this.requestService.ConfirmRequestByEmil(this.employee.email)
    .subscribe((res) => {
      this.vacation = res;
      const today = moment(new Date()).format('YYYY-MM-DD') as any;
      this.vacation.forEach((item: any) => {
        if (moment(today).isBefore(item.date)){
          this.vacationPlanned.push(item);
          this.sortArr(this.vacationPlanned);
        }else{
          this.requestService.DeleteRequest(item.id)
          .subscribe(() => {
          });
        }
      });
    });
  }

  getEventMonth(){
    this.eventService.GetEventMonth()
    .subscribe((res) => {
      this.eventMonth = res;
      this.emoloyeeService.GetEmplBirthMonth()
        .subscribe((result) => {
        this.monthBirth = result;
        this.eventMonth.forEach((element: any) => {
          this.monthBirth.push(element);
        });
        if (this.monthBirth.length > 0){
          this.eventMonthBool = true;
          this.sortArr(this.monthBirth);
        }
    });
  });
  }
}
