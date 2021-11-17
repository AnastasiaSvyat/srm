import { Component, OnInit, ViewChild } from '@angular/core';
import { Request } from '../model/Request';
import { CountRequestService } from '../services/count-request.service';
import { RequestService } from '../services/request/request.service';
import { MsgAdminComponent } from './msg-admin/msg-admin.component';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  requestArr: Request[] = [];
  pendingRequestList: Request[] = [];
  countPendingReq!: number;
  requestCount!: any;
  @ViewChild('primaryMonthPicker', {static: false}) primaryMonthPicker!: MsgAdminComponent;
  constructor(
    private requestService: RequestService,
    private countRequestService: CountRequestService) { }

  ngOnInit(): void {
    this.requestService.GetAllRequest()
      .subscribe((res) => {
        this.requestCount = res.length;
      });
    this.countRequestService.data$.subscribe((rest: any) => {
      this.requestCount = rest;
    });
  }
}
