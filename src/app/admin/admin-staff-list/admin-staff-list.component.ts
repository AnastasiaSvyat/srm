import { Component, OnInit } from '@angular/core';
import { AddUserComponent } from '../add-user/add-user.component';
import {MatDialog} from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { SearchName } from 'src/app/model/SearchName';
import { Employee } from 'src/app/model/Employee';
import { UploadFileService } from 'src/app/services/UploadFile/upload-file.service';
import { DataEmployeeService } from 'src/app/services/dataEmployee/dataEmployee.service';
import * as moment from 'moment';


@Component({
  selector: 'app-admin-staff-list',
  templateUrl: './admin-staff-list.component.html',
  styleUrls: ['./admin-staff-list.component.scss']
})
export class AdminStaffListComponent implements OnInit {

  constructor(private employeeService: EmployeeService, public dialog: MatDialog,
              public uplFileService: UploadFileService, public service: DataEmployeeService) { }

  staffList: Employee[] = [];
  currentEmployee: SearchName = {};
  currentIndex = -1;
  name!: any;
  head!: any;
  btn!: any;
  newUser!: any;
  position!: any;
  birthday!: any;
  salary!: any;
  lastPerf!: any;
  email!: any;
  phone!: any;
  arhiveUser!: any;
  addCV!: any;
  passBool!: any;
  roleBool!: any;
  lastPerfBool!: any;
  changeUser!: any;
  employee!: any;


  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [3, 6, 9];

  displayedColumns: string[] = ['name', 'position', 'birthday', 'salary', 'firstDay', 'lastPerf', 'phone', 'email', 'cv', 'change'];

  ngOnInit(): void {
    this.service.data.subscribe(res => {
      this.employee = res;
    });
    this.retrieveStaff();
  }

  getRequestParams(searchName: string, page: number, pageSize: number): any {
    const params: any = {};
    if (searchName){
      params[`name`] = searchName;
    }
    if (page){
      params[`page`] = page - 1;
    }
    if (pageSize) {
      params[`size`] = pageSize;
    }
    return params;
  }

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
      height : '791px',
      data: {head: 'Add user:', btn: 'ADD', arhiveUser: false, addCV: 'Add CV',
      changeUser: '', roleBool: true, passBool: true, lastPerfBool: false}
    });
    dialogRef.afterClosed().subscribe(result => {
      result.monthBirth = (moment(result.date).format('MM') as any);
      result.dayBirth = (moment(result.date).format('DD') as any);
      this.employeeService.AddEmployee(result)
    .subscribe((res) => {
      this.retrieveStaff();
    });
    });
  }

  getUplFile(email: any){
    this.uplFileService.getUplFileByEmail(email);
  }

  editUser(event: any): void {
    this.getUplFile(event.email);
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '398px',
      height : '670px',
      data: {head: 'Edit user:', btn: 'SAVE', changeUser: event,
      arhiveUser: true, addCV: 'Add new CV', passBool: false, roleBool: false, lastPerfBool: true}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.newUser = result;
      this.employeeService.updateEmployee(event.id, this.newUser)
          .subscribe(
            success => console.log('Done'),
            error => console.log(error));
      this.retrieveStaff();
    });
}

searchName(): void {
  this.page = 1;
  this.retrieveStaff();
  }
}










