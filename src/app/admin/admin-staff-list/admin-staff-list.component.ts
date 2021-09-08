import { Component, NgZone, OnInit } from '@angular/core';
import { AddUserComponent } from '../add-user/add-user.component';
import {MatDialog} from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { Router } from '@angular/router';


// export interface StaffList {
//   photo:string;
//   name: string;
//   position: string;
//   birth:string;
//   phone:string;
//   email:string;
//   lastPref:string;
//   firstDay:string

// }






@Component({
  selector: 'app-admin-staff-list',
  templateUrl: './admin-staff-list.component.html',
  styleUrls: ['./admin-staff-list.component.scss']
})
export class AdminStaffListComponent implements OnInit {
  user!:any;
  StaffList:any = []
  constructor(public dialog: MatDialog,
    private employeeService:EmployeeService){ }

  ngOnInit(): void {
    this.getStaff()
  }
  
  addUser(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '398px',
      height :'791px',
    });
  dialogRef.afterClosed().subscribe(result => {
    this.getStaff()
  });
}
getStaff(){
  this.employeeService.GetStaff()
  .subscribe((res) => {
    this.StaffList = res
  });
}

displayedColumns: string[] = ['name','position', 'birth','salary','firstDay','lastPerf','phone','email']}
