import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HomePageAdminComponent } from '../home-page-admin/home-page-admin.component';
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  constructor(
  
    public dialogRef: MatDialogRef<AddEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HomePageAdminComponent
  ) { }

  ngOnInit(): void {
   
  }
  onNoClick(): void {
    this.dialogRef.close();
  }


}
