import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Employee } from 'src/app/model/Employee';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'app-user-open-menu-component',
  templateUrl: './user-open-menu-component.component.html',
  styleUrls: ['./user-open-menu-component.component.scss']
})
export class UserOpenMenuComponentComponent implements OnInit {

  employee!: Employee;
  requestCount!: number;

  constructor(
    private requestService: RequestService,
    private authService: AuthService,
    private bottomSheetRef: MatBottomSheetRef
  ) { }

  ngOnInit(): void {
    this.employee = this.authService.user;
    this.countConfirmRequest(this.employee);
  }

  countConfirmRequest(employee: Employee) {
    this.requestService.ConfirmRequestByIdLater(employee)
      .subscribe((result: any) => {
        this.requestCount = result.length;
      });
  }
  logout() {
    this.authService.logout();
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
