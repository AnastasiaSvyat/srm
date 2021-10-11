import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MsgAdminComponent } from 'src/app/admin/msg-admin/msg-admin.component';
import { DataEmployeeService } from 'src/app/services/dataEmployee/dataEmployee.service';
import { MaterialService } from 'src/app/services/material/material.service';
import { RequestService } from 'src/app/services/request/request.service';
import { MsgUserComponent } from '../msg-user/msg-user.component';

@Component({
  selector: 'app-add-request-user',
  templateUrl: './add-request-user.component.html',
  styleUrls: ['./add-request-user.component.scss']
})
export class AddRequestUserComponent implements OnInit {
  
  requestForm!:any
  createRequest!:any
  employee!:any
  
  constructor(
    public dialogRef: MatDialogRef<MsgUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MsgUserComponent,
    public requestService:RequestService,
    
  ) { }

  ngOnInit(): void {

    this.requestForm = new FormGroup({
      email: new FormControl(this.data.employee.email,[Validators.required]),
      name: new FormControl(this.data.employee.name,[Validators.required]),
      type: new FormControl('',[Validators.required]),
      startDate: new FormControl('',[Validators.required]),
      endDate: new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required]),
      confirm: new FormControl('',[Validators.required])

    })
  
  }
  get email() { return this.requestForm.get('email')!; }
  get type() { return this.requestForm.get('type')!; }
  get startDate() { return this.requestForm.get('startDate')!; }
  get endDate() { return this.requestForm.get('endDate')!; }
  get description() { return this.requestForm.get('description')!; }
  get confirm() { return this.requestForm.get('confirm')!; }

  


  onNoClick(): void {
    this.dialogRef.close();
  }
  addRequest(): void{
    console.log(this.requestForm.value);
    this.requestService.AddRequest(this.requestForm.value)
    .subscribe((res) => {
      MaterialService.toast("Congratulations! Event has been added!")
      this.dialogRef.close(this.requestForm.value)
      this.createRequest = res
      console.log(this.createRequest);
      
    }, (err) => {
      MaterialService.toast("This event is already exists. Try another one.")
      console.log(err);
    });
   
  }
}