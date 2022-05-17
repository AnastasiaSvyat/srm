import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
<<<<<<< HEAD
import { Router } from '@angular/router';
=======
>>>>>>> d387566ec0979b27dffcb7e2bfa2d8adeff10191
import { Employee } from '../model/Employee';
import { AuthService } from '../services/auth/auth.service';
import { RequestService } from '../services/request/request.service';
import { UserOpenMenuComponentComponent } from './user-open-menu-component/user-open-menu-component.component';
<<<<<<< HEAD
=======
import { UserUpdatePasswordComponent } from './user-update-password/user-update-password.component';
>>>>>>> d387566ec0979b27dffcb7e2bfa2d8adeff10191

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

<<<<<<< HEAD
  

=======
>>>>>>> d387566ec0979b27dffcb7e2bfa2d8adeff10191
  constructor(
    private requestService: RequestService,
    private authService: AuthService,
    private bottomSheet: MatBottomSheet,
<<<<<<< HEAD
    private router: Router
=======
    private overlay: Overlay,
    private dialog: MatDialog
>>>>>>> d387566ec0979b27dffcb7e2bfa2d8adeff10191
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

<<<<<<< HEAD
=======
  updatePassword() {
    const dialogRef = this.dialog.open(UserUpdatePasswordComponent, {
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
>>>>>>> d387566ec0979b27dffcb7e2bfa2d8adeff10191

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);

  }

  openBottomSheet(): void {
    this.bottomSheet.open(UserOpenMenuComponentComponent);
  }

  openBottomSheet(): void {
    this.bottomSheet.open(UserOpenMenuComponentComponent);
  }

}
