import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { RequestService } from '../services/request/request.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  requestCount!: any;
  employee!: any;

  constructor(
    private requestService: RequestService,
    private authService: AuthService) { }

  ngOnInit(): void {

    // this.dataEmplService.data.subscribe(value => {
      this.employee = this.authService.user;
      this.countConfirmRequest(this.employee);
    // });
  }

  countConfirmRequest(employee: any) {
    this.requestService.ConfirmRequestByIdLater(employee)
      .subscribe((result: any) => {
        this.requestCount = result.length;
      });
  }
  logout(){
    this.authService.logout();
  }

}
