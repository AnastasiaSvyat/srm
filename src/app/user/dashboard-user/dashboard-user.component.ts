import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
import { UploadPhoto } from 'src/app/model/UploadPhoto';
import { UploadPhotoService } from 'src/app/services/uploadPhoto/upload-photo.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})
export class DashboardUserComponent implements OnInit {
  uploadFileName = '';
  employee!: Employee;
  cv!: any;
  uploadFileList!: UploadFile;
  vacationPlannedList: Request[] = [];
  eventMonthList: Events[] = [];
  birthMonthList: Employee[] = [];
  urlPhoto!: string;
  dataPhotoUpload!: UploadPhoto;
  cvForm!: FormGroup;
  docPDF!: any;
  urlCV!: string;
  nextVacation!: Request;

  constructor(
    public dialog: MatDialog,
    private emoloyeeService: EmployeeService,
    private uploadFileService: UploadFileService,
    private overlay: Overlay,
    private requestService: RequestService,
    private uploadPhotoService: UploadPhotoService,
    private auth: AuthService,
    private eventService: EventService) {
  }

  ngOnInit(): void {
    this.employee = this.auth.user;
    this.getEmployeeById();
    this.cvForm = new FormGroup({
      name: new FormControl(null),
      cv: new FormControl(null)
    });

    this.getUploadFile();
    this.getVacationsPlanned();
    this.getEventMonth();
    this.getPhotoEmployee();
  }

  getEmployeeById() {
    this.emoloyeeService.GetEmployee(this.employee.id)
      .subscribe((res) => {
        this.employee = res;
      });
  }

  getPhotoEmployee() {
    this.uploadPhotoService.GetPhotoById(this.employee.id)
      .subscribe((res) => {
        if (res) {
          this.dataPhotoUpload = res;
          this.urlPhoto = res.imagePath;
        }
      });
  }

  addNewInfo(employee: Employee): void {
    const dialogRef = this.dialog.open(AddInfoUserComponent, {
      width: '398px',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      minHeight: '298px',
      height: 'auto',
      disableClose: true,
      data: {
        updateEmployee: employee,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getEmployeeById();
      }
    });
  }


  editUser(event: Employee): void {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      width: '398px',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      minHeight: '680px',
      height: 'auto',
      disableClose: true,
      data: {
        head: 'Edit user:',
        btn: 'SAVE',
        updateEmployee: event,
        addCV: 'Add new CV'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employee = result;
        this.getUploadFile();
        this.getPhotoEmployee();
        this.getUploadFile();
      }
    });
  }

  getUploadFile() {
    this.uploadFileService.getUplFileById(this.employee)
      .subscribe((res) => {
        this.uploadFileList = res;
        this.uploadFileName = '';
        if (this.uploadFileList) {
          this.cv = this.uploadFileList;
          this.uploadFileName = this.cv.name;
        }
      });
  }

  getCV() {
    this.uploadFileService.getUplFileById(this.employee)
      .subscribe((result) => {
        this.urlCV = result.imagePath;
        const iframe = '<iframe width=\'100%\' height=\'100%\' src=\'' + this.urlCV + '\'></iframe>';
        this.docPDF = window.open();
        this.docPDF.document.write(iframe);
        this.docPDF.document.close();
      });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.cvForm.patchValue({ cv: file });
      this.cvForm.patchValue({ name: file.name });
      this.uploadFileName = file.name;
      this.uploadFileService.uploadFile(this.cvForm.value.name, this.cvForm.value.cv, this.employee.id)
        .subscribe((res: any) => {
          console.log(res);
          this.getUploadFile();
        });
    }
  }

  deleteCV() {
    if (!this.cv) {
      this.cvForm.reset();
      this.uploadFileName = '';
    } else {
      this.uploadFileService.deleteUplFile(this.cv._id)
        .subscribe(() => {
          this.getUploadFile();
        });
    }
  }

  // vacation

  getVacationsPlanned() {
    this.requestService.ConfirmRequestByIdLater(this.employee)
      .subscribe((res) => {
        this.vacationPlannedList = res;
        this.nextVacation = this.vacationPlannedList[0];
      });
  }

  getEventMonth() {
    this.eventService.GetEventMonth()
      .subscribe((res) => {
        this.eventMonthList = res;
        this.emoloyeeService.GetEmplBirthMonth()
          .subscribe((result) => {
            this.birthMonthList = result;
            console.log(this.birthMonthList);
            this.eventMonthList.forEach((element: any) => {
              this.birthMonthList.push(element);
              console.log(this.birthMonthList);
            });
          });
      });
  }
}
