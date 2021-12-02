import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RequestService } from '../request/request.service';

@Injectable({
  providedIn: 'root'
})
export class CountRequestService {
  requestCountPending!: number;

  constructor(private requestService: RequestService) {

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

