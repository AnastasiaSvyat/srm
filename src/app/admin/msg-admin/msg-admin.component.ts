import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Request } from 'src/app/model/Request';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'app-msg-admin',
  templateUrl: './msg-admin.component.html',
  styleUrls: ['./msg-admin.component.scss']
})
export class MsgAdminComponent implements OnInit {


  constructor(private requestService: RequestService) { }

  requestList: Request[] = [];
  haveNewRequest!: boolean;
  pendingRequestList: Request[] = [];
  confirmRequestList: Request[] = [];
  haveConfirmRequest!: boolean;
  havePendingRequest!: boolean;

  displayedColumns: string[] = ['startDate', 'type', 'date', 'description', 'decline', 'confirm'];
  displayedColumnsConfirm: string[] = ['startDate', 'type', 'date', 'con', 'description'];

  ngOnInit(): void {
    this.pendingRequest();
    this.confirmRequest();
  }


  pendingRequest() {
    this.requestService.GetAllRequest()
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
    this.requestService.ConfirmRequest()
      .subscribe((res) => {
        this.confirmRequestList = res;
        if (this.confirmRequestList.length === 0) {
          this.haveConfirmRequest = false;
        } else {
          this.haveConfirmRequest = true;
        }
      });
  }

  actionRequest(res: any, element: any) {
    if (res === true) {
      element.confirm = res;
    } else {
      element.decline = true;
    }
    this.requestService.UpdateRequest(element._id, element)
      .subscribe(() => {
        this.confirmRequest();
        this.pendingRequest();
      });
  }
}
