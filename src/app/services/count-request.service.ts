import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataEmployeeService } from './dataEmployee/dataEmployee.service';
import { RequestService } from './request/request.service';

@Injectable({
  providedIn: 'root'
})
export class CountRequestService {
  requestArr!: any;
  constructor(private requestService: RequestService, private dataEmplService: DataEmployeeService) {
    this.dataEmplService.data.subscribe(value => {
      console.log(value);
    });
    this.requestService.GetAllRequest()
      .subscribe((res) => {
        this.requestArr = res.length;
        console.log(this.requestArr);
      });
  }
  private data = new BehaviorSubject(this.requestArr);
  data$ = this.data.asObservable();

  changeData(data: any) {
    this.data.next(data);
  }
}
// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { RequestService } from './request/request.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class CountRequestService {
//   // requestArr!: any;

//   constructor(
//     // private requestService: RequestService
//   ) {
//     // this.requestService.GetAllRequest()
//     //   .subscribe((res) => {
//     //     this.requestArr = res;
//     //   });
//   }

//   data$ = this.data.asObservable(0);

//   changeData(data: any) {
//     this.data$.next(data);
//   }
// }
