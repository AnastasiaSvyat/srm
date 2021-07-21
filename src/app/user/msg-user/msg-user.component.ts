import { Component, OnInit } from '@angular/core';
import { AddRequestUserComponent } from '../add-request-user/add-request-user.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-msg-user',
  templateUrl: './msg-user.component.html',
  styleUrls: ['./msg-user.component.scss']
})
export class MsgUserComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
 
  


  ngOnInit(): void {
  }
  addRequest( ){
    const dialogRef = this.dialog.open(AddRequestUserComponent, {
      width: '398px',
      height :'516px',
  });
}

}
