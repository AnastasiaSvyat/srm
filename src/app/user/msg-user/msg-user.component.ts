import { Component, OnInit } from '@angular/core';
import { AddRequestUserComponent } from '../add-request-user/add-request-user.component';
import { MatDialog } from '@angular/material/dialog';
import { RequestService } from 'src/app/services/request/request.service';
import { DataEmployeeService } from 'src/app/services/dataEmployee/dataEmployee.service';
import * as moment from 'moment';
import { MaterialService } from 'src/app/services/material/material.service';

@Component({
  selector: 'app-msg-user',
  templateUrl: './msg-user.component.html',
  styleUrls: ['./msg-user.component.scss']
})
export class MsgUserComponent implements OnInit {
  
  requestArr!:any
  employee!:any
  pendingRequestArr:any;
  confirmRequestArr:any;
  pendingRequestBool!:Boolean
  confirmRequestBool!:Boolean
  declineRequestBool!:Boolean
  declineRequestArr!:any;
  
  constructor(public dialog: MatDialog,
    public requestService:RequestService,
    public service: DataEmployeeService) { }
  

  ngOnInit(): void {
    this.getEmloyee()
    this.pendingRequest()
    this.confirmRequest()
    this.declineRequest()
    
  }

  displayedColumns: string[] = ['startDate','type', 'date','description',]

  getEmloyee(){
    this.service.data.subscribe(value => {
      this.employee = value
      console.log(this.employee.email);
      
    });
    console.log(this.employee.email);

  }

  pendingRequest(){

    
    this.requestService.GetAllRequestEmail(this.employee.email)
    .subscribe((res) => {
    this.pendingRequestArr = res
    console.log(this.pendingRequestArr);
    
    if(this.pendingRequestArr.length == 0){
      this.pendingRequestBool =false
    }else{
      this.pendingRequestBool =true
    }
    })
  }

  confirmRequest(){
    this.requestService.ConfirmRequestByEmil(this.employee.email)
    .subscribe((res) => {
      this.confirmRequestArr = res
      if(this.confirmRequestArr.length == 0){
        this.confirmRequestBool =false
      }else{
        this.confirmRequestBool =true
      }
    })
  }
  
  declineRequest(){
    this.requestService.DeclineRequestByEmail(this.employee.email)
    .subscribe((res) => {
      this.declineRequestArr = res
      if(this.declineRequestArr.length == 0){
        this.declineRequestBool =false
      }else{
        this.declineRequestBool =true
      }
    })
  }

  addRequest(): void {
    const dialogRef = this.dialog.open(AddRequestUserComponent, {
      width: '398px',
      height :'516px',
      data:{employee:this.employee}
    });
    dialogRef.afterClosed().subscribe(result => {
  result.month = <any>moment(result.date).format('MM')
  this.requestService.AddRequest(result)
  .subscribe((res) => {
    MaterialService.toast("Congratulations! Event has been added!")
    this.pendingRequest()
    
    // this.createRequest = res
  }, (err) => {
    MaterialService.toast("This event is already exists. Try another one.")
  });
}
    );
  }
}