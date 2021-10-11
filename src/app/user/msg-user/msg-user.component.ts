import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AddRequestUserComponent } from '../add-request-user/add-request-user.component';
import {MatDialog} from '@angular/material/dialog';
import { Request } from 'src/app/model/Request';
import { RequestService } from 'src/app/services/request/request.service';
import { DataEmployeeService } from 'src/app/services/dataEmployee/dataEmployee.service';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-msg-user',
  templateUrl: './msg-user.component.html',
  styleUrls: ['./msg-user.component.scss']
})
export class MsgUserComponent implements OnInit {
  
  requestArr!:any
  employee!:any
  email!:any
  requestTrue:any = []
  requestFalse:any = []
  haveRequest!:boolean
  pendingRequestArr:any = []
  arr:any = []
  requestList!:any
  k!:any
  @ViewChild(MatTable) table !: MatTable<any>;

 
  
  
  constructor(public dialog: MatDialog,
    public requestService:RequestService,
    public service: DataEmployeeService) { }
  

  ngOnInit(): void {
    this.service.data.subscribe(value => {
      this.employee = value
    });
   this.retrieveResponse()
   
  }
  displayedColumns: string[] = ['startDate','type', 'date','description',]

  addRequest(): void {
    const dialogRef = this.dialog.open(AddRequestUserComponent, {
      width: '398px',
      height :'516px',
      data:{employee:this.employee}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.pendingRequestArr.push(result)
      this.table.renderRows();
    });
  }

  retrieveResponse(): void {
    this.requestService.GetAllRequest()
    .subscribe((res) => {
    this.requestList = res
    this.requestList.forEach((element:any) => {
      if(element.email == this.employee.email){
        console.log(this.employee.email);
        console.log(element.email);
        
     if(element.confirm == ""){
        this.pendingRequestArr.push(element)

        this.haveRequest = true
      }
    if(element.confirm == 'true'){
      this.requestTrue.push(element)
    }
    if(element.confirm == 'false'){
      this.requestFalse.push(element)
    }
  }
    });
    })
  }
}