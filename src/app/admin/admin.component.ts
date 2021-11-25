import { Component, OnInit, ViewChild } from '@angular/core';
import { Request } from '../model/Request';
import { CountRequestService } from '../services/countRequest/count-request.service';
import { RequestService } from '../services/request/request.service';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  requestArr: Request[] = [];
  pendingRequestList: Request[] = [];
  requestCount!: any;

  constructor(
    private requestService: RequestService,
    private countRequestService: CountRequestService) { }

  ngOnInit(): void {
    this.requestService.GetPendingRequest()
      .subscribe((res) => {
        this.requestCount = res.length;
      });
    this.countRequestService.data$.subscribe((result: any) => {
      this.requestCount = result;
    });
  }
}
