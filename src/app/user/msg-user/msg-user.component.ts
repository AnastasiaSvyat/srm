import { Component, OnInit } from '@angular/core';
import { AddRequestUserComponent } from '../add-request-user/add-request-user.component';
import { MatDialog } from '@angular/material/dialog';
import { RequestService } from 'src/app/services/request/request.service';
import { Employee } from 'src/app/model/Employee';
import { Request } from 'src/app/model/Request';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Overlay } from '@angular/cdk/overlay';


@Component({
  selector: 'app-msg-user',
  templateUrl: './msg-user.component.html',
  styleUrls: ['./msg-user.component.scss']
})
export class MsgUserComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public requestService: RequestService,
    private authService: AuthService,
    private overlay: Overlay,
  ) { }

  employee!: Employee;
  pendingRequestList: Request[] = [];
  confirmRequestList: Request[] = [];
  declineRequestList: Request[] = [];

  displayedColumns: string[] = ['startDate', 'type', 'date', 'description'];

  ngOnInit(): void {
    this.getEmloyee();
    this.pendingRequest();
    this.confirmRequest();
    this.declineRequest();
  }

  getEmloyee() {
    this.employee = this.authService.user;
  }

  pendingRequest() {
    this.requestService.GetPendingRequestById(this.employee)
      .subscribe((res) => {
        this.pendingRequestList = res;
      });
  }

  confirmRequest() {
    this.requestService.ConfirmRequestByIdLater(this.employee)
      .subscribe((res) => {
        this.confirmRequestList = res;
      });
  }

  declineRequest() {
    this.requestService.DeclineRequestById(this.employee)
      .subscribe((res) => {
        this.declineRequestList = res;
      });
  }

  addRequest(): void {
    const dialogRef = this.dialog.open(AddRequestUserComponent, {
      width: '398px',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      minHeight: '416px',
      height: 'auto',
      data: { employee: this.employee }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pendingRequest();
      }
    }
    );
  }
}
