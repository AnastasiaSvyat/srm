import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { CountRequestService } from '../services/countRequest/count-request.service';
import { RequestService } from '../services/request/request.service';
import { AdminOpenMenuComponentComponent } from './admin-open-menu-component/admin-open-menu-component.component';
import { AdminUpdatePasswordComponent } from './admin-update-password/admin-update-password.component';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  requestCount!: number;

  constructor(
    private requestService: RequestService,
    private auth: AuthService,
    private countRequestService: CountRequestService,
    private bottomSheet: MatBottomSheet,
    private overlay: Overlay,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.requestService.GetPendingRequest()
      .subscribe((res) => {
        this.requestCount = res.length;
      });
    this.countRequestService.data$.subscribe((result) => {
      this.requestCount = result;
    });
  }

  openBottomSheet(): void {
    this.bottomSheet.open(AdminOpenMenuComponentComponent);
  }


  updatePassword() {
    const dialogRef = this.dialog.open(AdminUpdatePasswordComponent, {
      width: '398px',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      minHeight: '321px',
      height: 'auto',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
      }
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
