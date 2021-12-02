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
  updateUser!: Employee;
  vacationPlannedList: Request[] = [];
  eventMonthList: Events[] = [];
  birthMonthList: Employee[] = [];
  fileInfos!: any;
  urlPhoto!: string;
  dataPhotoUpload!: UploadPhoto;
  dataCVUpload!: UploadFile;
  cvForm!: FormGroup;
  docPDF!: any;
  urlCV!: any;

  constructor(
    public dialog: MatDialog,
    private emoloyeeService: EmployeeService,
    private uploadFileService: UploadFileService,
    private requestService: RequestService,
    private uploadPhotoService: UploadPhotoService,
    private auth: AuthService,
    private eventService: EventService) {
  }

  ngOnInit(): void {
    this.employee = this.auth.user;
    console.log(this.employee);
    this.cvForm = new FormGroup({
      name: new FormControl(null),
      cv: new FormControl(null)
    });
    this.getUploadFile();
    this.getVacationsPlanned();
    this.getEventMonth();
    this.getPhotoEmployee();
  }

  getPhotoEmployee() {
    this.uploadPhotoService.GetPhotoById(this.employee)
      .subscribe((res) => {
        if (res.length) {
          this.urlPhoto = res[0].imagePath;
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
        console.log(result);
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
        this.updateUser = result[0];
        this.dataPhotoUpload = result[1];
        this.dataCVUpload = result[2];
        this.emoloyeeService.updateEmployee(event.id, this.updateUser)
          .subscribe(
            success => {
              this.emoloyeeService.GetEmployee(event.id)
                .subscribe((res) => {
                  this.employee = res;
                  this.getUploadFile();
                });
            },
            error => console.log(error));
        if (this.dataPhotoUpload.image) {
          this.uploadPhotoService.uploadPhoto(this.dataPhotoUpload.name, this.dataPhotoUpload.image, this.updateUser)
            .subscribe(success => {
              this.getPhotoEmployee();
            },
              error => console.log(error));
        }
        if (this.dataCVUpload.cv != null) {
          this.uploadFileService.uploadFile(this.dataCVUpload.name, this.dataCVUpload.cv, this.updateUser)
            .subscribe((res: any) => {
              this.getUploadFile();
            });
        }
      }
    });
  }

  getUploadFile() {
    this.uploadFileService.getUplFileById(this.employee)
      .subscribe((res) => {
        this.uploadFileList = res;
        this.uploadFileName = '';
        if (this.uploadFileList.length) {
          this.cv = this.uploadFileList[0];
          this.uploadFileName = this.cv.name;
        }
      });
  }

  getCV(){
    this.uploadFileService.getUplFileById(this.employee)
    .subscribe((result) => {
      this.urlCV = result[0].imagePath;
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
      this.uploadFileService.uploadFile(this.cvForm.value.name, this.cvForm.value.cv, this.employee)
      .subscribe((res: any) => {
        this.getUploadFile();
      });
    }
  }

  deleteCV() {
    if (!this.cv._id){
      this.cvForm.reset();
      this.uploadFileName = '';
    }else{
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
      });
  }

  getEventMonth() {
    this.eventService.GetEventMonth()
      .subscribe((res) => {
        this.eventMonthList = res;
        console.log(this.eventMonthList);
        this.emoloyeeService.GetEmplBirthMonth()
          .subscribe((result) => {
            this.birthMonthList = result;
            this.eventMonthList.forEach((element: any) => {
              this.birthMonthList.push(element);
              console.log(this.birthMonthList);
              console.log('f');
            });
          });
      });
  }
}
