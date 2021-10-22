import { Component, OnInit } from '@angular/core';
import { AddUserComponent } from '../add-user/add-user.component';
import {MatDialog} from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { SearchName } from 'src/app/model/SearchName';
import { Employee } from 'src/app/model/Employee';


@Component({
  selector: 'app-admin-staff-list',
  templateUrl: './admin-staff-list.component.html',
  styleUrls: ['./admin-staff-list.component.scss']
})
export class AdminStaffListComponent implements OnInit {

  staffList: Employee[] = [];
  currentEmployee: SearchName = {};
  currentIndex = -1;
  name = '';
  head!:any
  btn!:any
  newUser!:any
  position!:any
  birthday!:any
  salary!:any
  lastPerf!:any
  email!:any
  phone!:any
  arhiveUser!:any
  addCV!:any
  password!:any
  role!:any
  lastPerfBool!:any


  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [3, 6, 9];

  constructor(private employeeService: EmployeeService,public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.retrieveStaff();
  }

  getRequestParams(searchName: string, page: number, pageSize: number): any {
    let params: any = {};
    if(searchName){
      params[`name`] = searchName;
    }
    if(page){
      params[`page`] = page - 1;
    }
    if (pageSize) {
      params[`size`] = pageSize;
    }
    return params;
  }

  displayedColumns: string[] = ['name','position', 'birthday','salary','firstDay','lastPerf','phone','email','cv','change']

  retrieveStaff(): void {
    const params = this.getRequestParams(this.name, this.page, this.pageSize);
    this.employeeService.getStaffListPagination(params)
    .subscribe(
      response => {
        const { staffList, totalItems } = response;
        this.staffList = staffList;
        this.count = totalItems;
      },
      error => {
        console.log(error);
      });
  }
  
  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveStaff();
  }
  
  setActiveEmployee(employee: Employee, index: number): void {
    this.currentEmployee = employee;
    this.currentIndex = index;
  }
  
  addUser(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '398px',
      height :'791px',
      data: {head: "Add user:",btn: "EDIT",arhiveUser:false,addCV:"Add CV",
      password:true,role:true,lastPerfBool:false}
    });
  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
    
    this.employeeService.AddEmployee(result)
    .subscribe(
      success => this.retrieveStaff(),
      error => console.log(error));
    });
  }
  
  editUser(event:any): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '398px',
      height :'670px',
      data: {head: "Edit task:",btn: "SAVE",name:event.name,position:event.position,
      birthday:event.birthday,salary:event.salary,
      lastPerf:event.lastPerf,email:event.email,phone:event.phone,
      arhiveUser:true,addCV:"Add new CV",password:false,role:false,lastPerfBool:true}
    });
    console.log(event);
    dialogRef.afterClosed().subscribe(result => {
      this.newUser = result;
      this.employeeService.updateEmployee(event.id,this.newUser)
          .subscribe(
            success => console.log("Done"),
            error => console.log(error));
            this.retrieveStaff();
    });
}

searchName(): void {
  this.page = 1;
  this.retrieveStaff();
  }
}










