import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'app-msg-admin',
  templateUrl: './msg-admin.component.html',
  styleUrls: ['./msg-admin.component.scss']
})
export class MsgAdminComponent implements OnInit {

  requestList!:any
  newRequest!:boolean
  AddConfirmRequest:any = []
  newRequestArr:any = []
  @ViewChildren(MatTable) table !: QueryList<MatTable<string>>;


  constructor(private requestService:RequestService, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.requestService.GetAllRequest()
    .subscribe((res) => {
    this.requestList = res
    this.requestList.forEach((element:any) => {
     if(element.confirm == ""){
        this.newRequestArr.push(element)
        this.newRequest = true
      }
    if(element.confirm == 'true'){
      this.AddConfirmRequest.push(element)
    }
    });
  })


  }
  
  displayedColumns: string[] = ['startDate','type', 'date','description','decline','confirm']
  displayedColumnsConfirm: string[] = ['startDate','type', 'date','con','description']

  confirmRequest(element:any){
    element.confirm = true
    this.requestService.UpdateRequest(element._id,element)
    .subscribe(
      success => console.log("Done"),
      error => console.log(error));
    this.newRequestArr.splice(this.newRequestArr.indexOf(element),1)
    this.AddConfirmRequest.push(element)
    this.table.first.renderRows();
    this.table.last.renderRows();
  }

  declineRequest(element:any){
    element.confirm = false
    this.requestService.UpdateRequest(element._id,element)
    .subscribe(
      success => console.log("Done"),
      error => console.log(error));
  this.newRequestArr.splice(this.newRequestArr.indexOf(element),1)
  this.table.first.renderRows();
  this.table.last.renderRows();
  }
}
