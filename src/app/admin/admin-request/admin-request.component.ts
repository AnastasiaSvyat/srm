import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestService } from 'src/app/services/request/request.service';
import { Employee } from 'src/app/model/Employee';
import { Request } from 'src/app/model/Request';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Overlay } from '@angular/cdk/overlay';
import { AdddRequestComponent } from './addd-request/addd-request.component';

@Component({
  selector: 'app-admin-request',
  templateUrl: './admin-request.component.html',
  styleUrls: ['./admin-request.component.scss']
})
export class AdminRequestComponent implements OnInit {

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

  displayedColumns: string[] = ['type', 'date', 'description'];

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
    const dialogRef = this.dialog.open(AdddRequestComponent, {
      width: '398px',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      minHeight: '416px',
      height: 'auto',
      disableClose: true,
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
