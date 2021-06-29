import { Component, OnInit } from '@angular/core';
import { AddEventComponent } from '../add-event/add-event.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-home-page-admin',
  templateUrl: './home-page-admin.component.html',
  styleUrls: ['./home-page-admin.component.css']
})
export class HomePageAdminComponent implements OnInit {
showAddEvent!:boolean
  constructor(public dialog: MatDialog,) {
    this.showAddEvent = false
   }

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
