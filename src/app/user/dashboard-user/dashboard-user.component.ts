import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AddUserComponent } from 'src/app/admin/add-user/add-user.component';
import { DataEmployeeService } from 'src/app/services/dataEmployee/dataEmployee.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { AddInfoUserComponent } from '../add-info-user/add-info-user.component';
import { UpdateUserComponent } from '../update-user/update-user.component';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})
export class DashboardUserComponent implements OnInit {
  fileName = ''
  fileInfos?: Observable<any>;
  employee:any = []
  id!:any
  updateUser!:any
  addCV!:any
  head!:any
  btn!:any

  updateEmployee!:any

constructor(public dialog: MatDialog, private service:DataEmployeeService,
    private emoloyeeService:EmployeeService,) {}


  ngOnInit(): void {
    this.service.data.subscribe(value => {
      this.employee = value
    });
    this.id = this.employee.id
    this.getInfo()
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
    this.emoloyeeService.GetEmployee(this.id)
      .subscribe(value => {
        this.employee = value
      });
  }

  editUser(event:any): void {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      width: '398px',
      height :'670px',
      data: {head: "Edit user:",btn: "SAVE",updateEmployee:event,
      addCV:"Add new CV"}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.updateUser = result;
      this.emoloyeeService.updateEmployee(event.id,this.updateUser)
          .subscribe(
            success => {
              this.emoloyeeService.GetEmployee(event.id)
              .subscribe((res) => {
                this.employee = res
              })
            },
            error => console.log(error));
    });
  }
  
  onFileSelected(event:any) {
    const file:File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("name", file);
    var name = formData.get("name")
    console.log(name);
    
    
      this.employee.file.push(name)
      // this.employee.file.push(file)
      console.log(this.employee);
      this.emoloyeeService.updateEmployee(this.id,this.employee)
      .subscribe((res) => {
        this.employee = res
        console.log(this.employee);
      }, (err) => {
          console.log(err);
      });
    }
  }
}