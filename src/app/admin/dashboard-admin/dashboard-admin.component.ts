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

  constructor(public dialog: MatDialog,) { }

  ngOnInit(): void {
  }
  addEvent(){
    const dialogRef = this.dialog.open(AddEventComponent, {
      width: '398px',
      height :'591px',
  });
  }
  addTask(){
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '398px',
      height :'361px',
  });
  
  }
  

}
