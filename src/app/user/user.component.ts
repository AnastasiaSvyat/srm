import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Employee } from '../model/Employee';
import { AuthService } from '../services/auth/auth.service';
import { RequestService } from '../services/request/request.service';
import { UserOpenMenuComponentComponent } from './user-open-menu-component/user-open-menu-component.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public requestCount!: number;
  employee!: Employee;

  hide = true;
  hideRepeat = true;

  

  constructor(
    private requestService: RequestService,
    private authService: AuthService,
    private bottomSheet: MatBottomSheet,
    private router: Router
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
    this.router.navigate(['/']);

  }

  openBottomSheet(): void {
    this.bottomSheet.open(UserOpenMenuComponentComponent);
  }

}
