import { Component, OnInit } from '@angular/core';
import { AddRequestUserComponent } from '../add-request-user/add-request-user.component';
import { MatDialog } from '@angular/material/dialog';
import { RequestService } from 'src/app/services/request/request.service';
import { DataEmployeeService } from 'src/app/services/dataEmployee/dataEmployee.service';
import * as moment from 'moment';
import { MaterialService } from 'src/app/services/material/material.service';
import { Employee } from 'src/app/model/Employee';
import { Request } from 'src/app/model/Request';


@Component({
  selector: 'app-msg-user',
  templateUrl: './msg-user.component.html',
  styleUrls: ['./msg-user.component.scss']
})
export class MsgUserComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public requestService: RequestService,
    public service: DataEmployeeService) { }

  employee!: Employee;
  pendingRequestList: Request[] = [];
  confirmRequestList: Request[] = [];
  havePendingRequest!: boolean;
  haveConfirmRequest!: boolean;
  haveDeclineRequest!: boolean;
  declineRequestList: Request[] = [];

  displayedColumns: string[] = ['startDate', 'type', 'date', 'description'];

  ngOnInit(): void {
    this.getEmloyee();
    this.pendingRequest();
    this.confirmRequest();
    this.declineRequest();
  }

  getEmloyee() {
    this.service.data.subscribe(value => {
      this.employee = value;
    });
  }

  pendingRequest() {
    this.requestService.GetAllRequestEmail(this.employee.email)
      .subscribe((res) => {
        this.pendingRequestList = res;
        if (this.pendingRequestList.length === 0) {
          this.havePendingRequest = false;
        } else {
          this.havePendingRequest = true;
        }
      });
  }

  confirmRequest() {
    this.requestService.ConfirmRequestByEmil(this.employee.email)
      .subscribe((res) => {
        this.confirmRequestList = res;
        if (this.confirmRequestList.length === 0) {
          this.haveConfirmRequest = false;
        } else {
          this.haveConfirmRequest = true;
        }
      });
  }

  declineRequest() {
    this.requestService.DeclineRequestByEmail(this.employee.email)
      .subscribe((res) => {
        this.declineRequestList = res;
        if (this.declineRequestList.length === 0) {
          this.haveDeclineRequest = false;
        } else {
          this.haveDeclineRequest = true;
        }
      });
  }

  addRequest(): void {
    const dialogRef = this.dialog.open(AddRequestUserComponent, {
      width: '398px',
      height: '516px',
      data: { employee: this.employee }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.month = (moment(result.date).format('MM') as any);
        this.requestService.AddRequest(result)
          .subscribe((res) => {
            // MaterialService.toast('Congratulations! Event has been added!');
            this.pendingRequest();
          }, (err) => {
            // MaterialService.toast('This event is already exists. Try another one.');
          });
      }
    }
    );
  }
}
