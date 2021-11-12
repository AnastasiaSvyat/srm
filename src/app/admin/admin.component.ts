import { Component, OnInit } from '@angular/core';
import { Request } from '../model/Request';
import { RequestService } from '../services/request/request.service';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  requestArr: Request[] = [];
  pendingRequestList: Request[] = [];
  countPendingReq!: number;

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    this.requestService.GetAllRequest()
      .subscribe((res) => {
        this.requestArr = res;
        this.requestArr.forEach((element: any) => {
          if (element.confirm === '') {
            this.pendingRequestList.push(element);
          }
        });
        this.countPendingReq = this.pendingRequestList.length;
      });
  }
}
