import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'app-msg-admin',
  templateUrl: './msg-admin.component.html',
  styleUrls: ['./msg-admin.component.scss']
})
export class MsgAdminComponent implements OnInit {


  constructor(private requestService: RequestService, private changeDetectorRefs: ChangeDetectorRef) { }

  requestList!: any;
  newRequest!: boolean;
  pendingRequestArr: any;
  confirmRequestArr: any;
  confirmRequestBool!: boolean;
  pendingRequestBool!: boolean;


  @ViewChildren(MatTable) table !: QueryList<MatTable<string>>;

  displayedColumns: string[] = ['startDate', 'type', 'date', 'description', 'decline', 'confirm'];
  displayedColumnsConfirm: string[] = ['startDate', 'type', 'date', 'con', 'description'];

  ngOnInit(): void {
    this.pendingRequest();
    this.confirmRequest();
  }


  pendingRequest(){
    this.requestService.GetAllRequest()
    .subscribe((res) => {
    this.pendingRequestArr = res;
    if (this.pendingRequestArr.length === 0){
      this.pendingRequestBool = false;
    }else{
      this.pendingRequestBool = true;
    }
    });
  }

  confirmRequest(){
    this.requestService.ConfirmRequest()
    .subscribe((res) => {
      this.confirmRequestArr = res;
      if (this.confirmRequestArr.length === 0){
        this.confirmRequestBool = false;
      }else{
        this.confirmRequestBool = true;
      }
    });
  }

  actionRequest(res: any, element: any){
    if (res === true){
      element.confirm = res;
    }else{
      element.decline = true;
    }
    this.requestService.UpdateRequest(element.id, element)
    .subscribe(() => {
      this.confirmRequest();
      this.pendingRequest();
  }); }
}
