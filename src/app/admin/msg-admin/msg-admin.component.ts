import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Request } from 'src/app/model/Request';
import { UploadPhoto } from 'src/app/model/UploadPhoto';
import { CountRequestService } from 'src/app/services/countRequest/count-request.service';
import { RequestService } from 'src/app/services/request/request.service';
import { UploadPhotoService } from 'src/app/services/uploadPhoto/upload-photo.service';

@Component({
  selector: 'app-msg-admin',
  templateUrl: './msg-admin.component.html',
  styleUrls: ['./msg-admin.component.scss']
})
export class MsgAdminComponent implements OnInit {

  constructor(
    private requestService: RequestService,
    private countRequestService: CountRequestService,
    private uloadPhotoService: UploadPhotoService) { }

  pendingRequestList: Request[] = [];
  confirmRequestList: Request[] = [];
  dataCountRequest!: number;
  photoEmployee: UploadPhoto[] = [];

  displayedColumns: string[] = ['employee', 'type', 'date', 'description', 'decline', 'confirm'];
  displayedColumnsConfirm: string[] = ['employee', 'type', 'date', 'confirmad', 'description', 'decline'];

  ngOnInit(): void {
    this.pendingRequest();
    this.confirmRequest();
    this.getPhotoEmployee();
    this.countRequestService.data$.subscribe((result) => {
      this.dataCountRequest = result;
    });
  }
  countRequest(count: any) {
    this.countRequestService.changeData(count);
  }

  getPhotoEmployee() {
    this.uloadPhotoService.GetPhoto()
      .subscribe((res) => {
        this.photoEmployee = res;
      });
  }

  getEmployeePhoto(userId: string) {
    const imgResult = this.photoEmployee.find(img => img.idEmployee === userId);
    return imgResult?.imagePath ?? '../../../assets/img/nouser.jpeg';
  }

  pendingRequest() {
    this.requestService.GetPendingRequest()
      .subscribe((res) => {
        this.pendingRequestList = res;
        console.log(this.pendingRequestList);
        this.countRequestService.data$.subscribe((result) => {
          this.dataCountRequest = result;
        });
        this.countRequest(this.pendingRequestList.length);
      });
  }

  confirmRequest() {
    this.requestService.ConfirmRequest()
      .subscribe((res) => {
        this.confirmRequestList = res;
      });
  }

  actionRequest(res: any, elem: any) {
    if (res) {
      elem.confirm = true;
      elem.decline = false;
    } else {
      elem.confirm = false;
      elem.decline = true;
    }
    this.requestService.UpdateRequest(elem._id, elem)
      .subscribe(() => {
        this.confirmRequest();
        this.pendingRequest();
      });
  }
}
