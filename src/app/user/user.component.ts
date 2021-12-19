import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/Employee';
import { AuthService } from '../services/auth/auth.service';
import { RequestService } from '../services/request/request.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  requestCount!: number;
  employee!: Employee;

  constructor(
    private requestService: RequestService,
    private authService: AuthService) { }

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

}
