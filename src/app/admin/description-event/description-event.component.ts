import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-description-event',
  templateUrl: './description-event.component.html',
  styleUrls: ['./description-event.component.scss']
})
export class DescriptionEventComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DescriptionEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log( this.data.dataEvent.type);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
