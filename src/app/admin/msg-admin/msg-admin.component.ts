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
  pendingRequestList: Request[] = [];
  confirmRequestList: Request[] = [];

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
      });
  }

  confirmRequest() {
    this.requestService.ConfirmRequest()
      .subscribe((res) => {
        this.confirmRequestList = res;
      });
  }

  actionRequest(res: any, elem: any) {
    res ? elem.confirm = true : elem.decline = true;
    this.requestService.UpdateRequest(elem._id, elem)
      .subscribe(() => {
        this.confirmRequest();
        this.pendingRequest();
      });
  }
}
