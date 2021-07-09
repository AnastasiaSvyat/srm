import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MsgAdminComponent } from 'src/app/admin/msg-admin/msg-admin.component';
import { MsgUserComponent } from '../msg-user/msg-user.component';

@Component({
  selector: 'app-add-request-user',
  templateUrl: './add-request-user.component.html',
  styleUrls: ['./add-request-user.component.css']
})
export class AddRequestUserComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MsgUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MsgAdminComponent
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
