import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { UploadFile } from 'src/app/model/UploadFile';
import { DataEmployeeService } from 'src/app/services/dataEmployee/dataEmployee.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { UploadFileService } from 'src/app/services/uploadFile/upload-file.service';
import { AddInfoUserComponent } from '../add-info-user/add-info-user.component';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})
export class DashboardUserComponent implements OnInit {
  fileName = ''
  employee:any = []
  getId!:any
  cv!:any


  
  constructor(public dialog: MatDialog, private service:DataEmployeeService,
    private emoloyeeService:EmployeeService,private uploadFileService:UploadFileService,) {}


  ngOnInit(): void {
   this.getEmployee()
    this.getInfo()
    this.getUploadFile()
  }

  getEmployee(){
    this.service.data.subscribe(value => {
      this.employee = value
    });
    this.getId = this.employee.userId
  }

  getUploadFile(){
    this.uploadFileService.getGalleryById(this.employee.email)
    .subscribe((res) => {
      this.cv = res[res.length - 1]
      this.fileName = this.cv.name
      
    })
  }
  
  addNewInfo(): void {
    const dialogRef = this.dialog.open(AddInfoUserComponent, {
      width: '398px',
      height :'398px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.getInfo()
    });
   }
    
  getInfo(){
    this.emoloyeeService.GetEmployee(this.getId)
      .subscribe(value => {
        this.employee = value
      });
  }
  
  onFileSelected(event:any) {
    const file:File = event.target.files[0];
      if (file) {
        this.fileName = file.name;
    this.uploadFileService.uploadFile(this.employee,file)
      .subscribe((res) => {
        console.log('Done');
      }, (err) => {
          console.log(err);
      });
    }
  }
}