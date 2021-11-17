import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataEmployeeService } from 'src/app/services/dataEmployee/dataEmployee.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { RequestService } from 'src/app/services/request/request.service';
import { UploadFileService } from 'src/app/services/UploadFile/upload-file.service';
import { AddInfoUserComponent } from '../add-info-user/add-info-user.component';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { EventService } from 'src/app/services/event/event.service';
import { Employee } from 'src/app/model/Employee';
import { Events } from 'src/app/model/Events';
import { Request } from 'src/app/model/Request';
import { UploadFile } from 'src/app/model/UploadFile';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})
export class DashboardUserComponent implements OnInit {
  uploadFileName = '';
  employee!: Employee;
  cv: any = [];
  uploadFileList: UploadFile[] = [];
  updateUser!: Employee[];
  vacationPlannedList: Request[] = [];
  eventMonthList: Events[] = [];
  birthMonthList: Employee[] = [];
  fileInfos!: any;

  constructor(
    public dialog: MatDialog, private service: DataEmployeeService,
    private emoloyeeService: EmployeeService,
    private uploadFileService: UploadFileService,
    private requestService: RequestService,
    private eventService: EventService) {
  }

  ngOnInit(): void {
    this.getEmployee();
    this.getUploadFile();
    this.getVacationsPlanned();
    this.getEventMonth();
    this.fileInfos = this.uploadFileService.getFiles();
    console.log(this.fileInfos);
  }

  getEmployee() {
    this.service.data.subscribe(value => {
      this.employee = value;
    });
  }

  addNewInfo(): void {
    const dialogRef = this.dialog.open(AddInfoUserComponent, {
      width: '398px',
      height: '398px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getEmployee();
      }
    });
  }


  editUser(event: any): void {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      width: '398px',
      height: '680px',
      data: {
        head: 'Edit user:',
        btn: 'SAVE',
        updateEmployee: event,
        addCV: 'Add new CV'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
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
      }
    });
  }

  getUploadFile() {
    this.uploadFileService.getUplFileByEmail(this.employee)
      .subscribe((res) => {
        this.uploadFileList = res;
        this.uploadFileName = '';
        if (this.uploadFileList.length){
          this.cv = this.uploadFileList[0];
          this.uploadFileName = this.cv.name;
        }
      });
  }

  onFileSelected(event: any) {
    console.log(this.uploadFileList);
    const file: File = event.target.files[0];
    if (file) {
      this.uploadFileName = file.name;
      this.uploadFileService.uploadFile(this.employee, file)
        .subscribe((res) => {
          this.getUploadFile();
        });
    }
  }

  deleteCV() {
    console.log(this.cv._id);
    this.uploadFileService.deleteUplFile(this.cv._id)
      .subscribe((res) => {
        this.getUploadFile();
      });
  }

  // vacation

  getVacationsPlanned() {
    this.requestService.ConfirmRequestByEmilLater(this.employee)
      .subscribe((res) => {
        this.vacationPlannedList = res;
      });
  }

  getEventMonth() {
    this.eventService.GetEventMonth()
      .subscribe((res) => {
        this.eventMonthList = res;
        this.emoloyeeService.GetEmplBirthMonth()
          .subscribe((result) => {
            this.birthMonthList = result;
            this.eventMonthList.forEach((element: any) => {
              this.birthMonthList.push(element);
            });
          });
      });
  }
}
