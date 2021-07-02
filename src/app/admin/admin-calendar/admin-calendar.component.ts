import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddEventComponent } from '../add-event/add-event.component';

@Component({
  selector: 'app-admin-calendar',
  templateUrl: './admin-calendar.component.html',
  styleUrls: ['./admin-calendar.component.css']
})
export class AdminCalendarComponent implements OnInit {
  selected!: Date | null;
  constructor( public dialog: MatDialog, ) { }

  ngOnInit(): void {
  }
  
  addEvent(){
    const dialogRef = this.dialog.open(AddEventComponent, {
      width: '398px',
      height :'591px',
  });
  
  
    
  }
  
}
