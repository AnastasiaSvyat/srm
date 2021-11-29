import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataEmployeeService } from '../dataEmployee/dataEmployee.service';
import { RequestService } from '../request/request.service';

@Injectable({
  providedIn: 'root'
})
export class CountRequestService {
  requestCountPending!: number;

  constructor(private requestService: RequestService, private dataEmplService: DataEmployeeService) {

    this.requestService.GetPendingRequest()
      .subscribe((res) => {
        this.requestCountPending = res.length;
      });
  }

  private data = new BehaviorSubject(this.requestCountPending);
  data$ = this.data.asObservable();

  changeData(data: any) {
    this.data.next(data);
  }
}

