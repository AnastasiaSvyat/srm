import { Component, OnInit, ViewChild } from '@angular/core';
import { Request } from '../model/Request';
import { AuthService } from '../services/auth/auth.service';
import { CountRequestService } from '../services/countRequest/count-request.service';
import { DataEmployeeService } from '../services/dataEmployee/dataEmployee.service';
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
  user!: any;
  constructor(
    private requestService: RequestService,
    private auth: AuthService,
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
  logout(){
    this.auth.logout();
  }
}
