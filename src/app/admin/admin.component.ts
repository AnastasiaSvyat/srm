import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthService } from '../services/auth/auth.service';
import { CountRequestService } from '../services/countRequest/count-request.service';
import { RequestService } from '../services/request/request.service';
import { AdminOpenMenuComponentComponent } from './admin-open-menu-component/admin-open-menu-component.component';



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
    private bottomSheet: MatBottomSheet
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

  logout() {
    this.auth.logout();
  }
}
