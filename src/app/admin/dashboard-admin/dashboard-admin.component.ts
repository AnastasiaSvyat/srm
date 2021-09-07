import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddEventComponent } from '../add-event/add-event.component';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {
  employee:any = [] 
  constructor(public dialog: MatDialog) {
    this.employee = history.state.data
  }

  ngOnInit(): void {}

  addEvent(): void {
    const dialogRef = this.dialog.open(AddEventComponent, {
      width: '398px',
      height :'591px',
    });
  }
  addTask(): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '398px',
      height :'361px',
    });
  }
}
