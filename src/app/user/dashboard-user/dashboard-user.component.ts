import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataEmployeeService } from 'src/app/services/dataEmployee/dataEmployee.service';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})
export class DashboardUserComponent implements OnInit {

  employee:any = []
  
  constructor(public dialog: MatDialog, private service:DataEmployeeService) {}

  ngOnInit(): void {
    this.service.data.subscribe(value => {
      this.employee = value
      console.log(this.employee.name);
      
    });
  }
}