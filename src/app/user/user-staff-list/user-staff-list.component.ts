import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/Employee';
import { SearchName } from 'src/app/model/SearchName';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-user-staff-list',
  templateUrl: './user-staff-list.component.html',
  styleUrls: ['./user-staff-list.component.scss']
})

export class UserStaffListComponent implements OnInit {
  staffList: Employee[] = [];
  currentEmployee: SearchName = {};
  name = ''
  currentIndex = -1;
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [3, 6, 9];
  
  constructor(private employeeService: EmployeeService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.retrieveStaff();
  }

 
  getRequestParams( page: number, pageSize: number): any {
    let params: any = {};
    if(page){
      params[`page`] = page - 1;
    }
    if (pageSize) {
      params[`size`] = pageSize;
    }
    return params;
  }

  displayedColumns: string[] = ['name','position', 'birthday','phone','email','skype']

  retrieveStaff(): void {
    const params = this.getRequestParams(this.page, this.pageSize);
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
}
