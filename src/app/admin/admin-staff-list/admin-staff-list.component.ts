import { Component, OnInit } from '@angular/core';
import { AddUserComponent } from '../add-user/add-user.component';
import {MatDialog} from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { Router } from '@angular/router';
import { SearchName } from 'src/app/model/SearchName';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
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

  displayedColumns: string[] = ['name','position', 'birth','salary','firstDay','lastPerf','phone','email']

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
    });
  dialogRef.afterClosed().subscribe(result => {
    this.retrieveStaff();
  });
  }
  
  searchName(): void {
    this.page = 1;
    this.retrieveStaff();
  }
}










