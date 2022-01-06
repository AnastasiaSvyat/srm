import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CountRequestService } from 'src/app/services/countRequest/count-request.service';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'app-admin-open-menu-component',
  templateUrl: './admin-open-menu-component.component.html',
  styleUrls: ['./admin-open-menu-component.component.scss']
})
export class AdminOpenMenuComponentComponent implements OnInit {

  requestCount!: number;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<AdminOpenMenuComponentComponent>,
    private auth: AuthService,
    private requestService: RequestService,
    private countRequestService: CountRequestService,
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

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  logout() {
    this.auth.logout();
  }

}
