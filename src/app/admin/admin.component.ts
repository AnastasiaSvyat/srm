import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request/request.service';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

requestArr!:any
pendingRequestArr:any = []
countPendingReq!:any

  constructor(private requestService:RequestService) {}

  ngOnInit(): void {
    this.requestService.GetAllRequest()
    .subscribe((res) => {
      this.requestArr = res
      this.requestArr.forEach((element:any) => {
        if(element.confirm == ""){
          this.pendingRequestArr.push(element)
          
        }
      });
      this.countPendingReq = this.pendingRequestArr.length
    })
    console.log(this.countPendingReq);
    
  }

}
