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
  haveEventMonth!: boolean;
  birthMonthList: Employee[] = [];
  haveBirthMonth!: boolean;

  constructor(
    public dialog: MatDialog, private service: DataEmployeeService,
    private emoloyeeService: EmployeeService,
    private uploadFileService: UploadFileService,
    private requestService: RequestService,
    private eventService: EventService) {
    this.haveBirthMonth = false;
  }

  ngOnInit(): void {
    this.getEmployee();
    this.getUploadFile();
    this.getVacationsPlanned();
    this.getEventMonth();
  }

  getEmployee() {
    this.service.data.subscribe(value => {
      this.employee = value;
    });
  }

  getUploadFile() {
    this.uploadFileService.getUplFileByEmail(this.employee)
      .subscribe((res) => {
        console.log(res);
        this.uploadFileList = res;
        if (this.uploadFileList.length > 0) {
          this.cv = res[res.length - 1];
          this.uploadFileName = this.cv.name;
        } else {
          this.uploadFileName = '';
          this.cv = [];
        }
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

  onFileSelected(event: any) {
    console.log(this.cv);
    const file: File = event.target.files[0];
    if (file) {
      this.uploadFileName = file.name;
      this.uploadFileService.uploadFile(this.employee, file)
        .subscribe((res) => {
          this.getUploadFile();
          console.log(this.cv._id);
          if (this.cv._id !== undefined) {
            this.deleteCV();
          }
        }, (err) => {
          console.log(err);
        });
    }
  }

  deleteCV() {
    console.log(this.cv);
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
            if (this.birthMonthList.length > 0) {
              this.haveEventMonth = true;
            }
          });
      });
  }
}
