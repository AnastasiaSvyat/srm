import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-about-user',
  templateUrl: './info-about-user.component.html',
  styleUrls: ['./info-about-user.component.scss']
})
export class InfoAboutUserComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<InfoAboutUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
