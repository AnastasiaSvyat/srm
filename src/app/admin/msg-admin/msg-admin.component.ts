import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Request } from 'src/app/model/Request';
import { CountRequestService } from 'src/app/services/count-request.service';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'app-msg-admin',
  templateUrl: './msg-admin.component.html',
  styleUrls: ['./msg-admin.component.scss']
})
export class MsgAdminComponent implements OnInit {
  @Output() outputToParent = new EventEmitter<any>();
  @Input() x: any;
  constructor(
    private requestService: RequestService,
    private countRequestService: CountRequestService) { }

  requestList: Request[] = [];
  pendingRequestList: Request[] = [];
  confirmRequestList: Request[] = [];
  data!: any;





  displayedColumns: string[] = ['startDate', 'type', 'date', 'description', 'decline', 'confirm'];
  displayedColumnsConfirm: string[] = ['startDate', 'type', 'date', 'con', 'description'];

  ngOnInit(): void {
    this.pendingRequest();
    this.confirmRequest();
    this.countRequestService.data$.subscribe((ress) => {
      this.data = ress;
      console.log(this.data);
    });
  }
  countRequest(count: any) {
    this.countRequestService.changeData(count);
  }

  pendingRequest() {
    this.requestService.GetAllRequest()
      .subscribe((res) => {
        this.pendingRequestList = res;
        this.countRequestService.data$.subscribe((ress) => {
          this.data = ress;
          console.log(this.data);
        });
        this.countRequest(this.pendingRequestList.length);
      });
  }

  confirmRequest() {
    this.requestService.ConfirmRequest()
      .subscribe((res) => {
        this.confirmRequestList = res;
        console.log(this.confirmRequestList);
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
