import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from './model/role';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MaterialService } from './services/material/material.service';
import { Employee } from './model/Employee';
import { AuthService } from './services/auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  user!: Employee;
  admin!: boolean;
  Role = Role;
  employeeLoginForm!: FormGroup;


  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.employeeLoginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  get isAuthorized() {
    return this.authService.isAuthorized();
  }

  loginEmployee(): void {
    this.authService.Login(this.employeeLoginForm.value)
      .subscribe((res) => {
        const loginEmploee = JSON.parse(JSON.stringify(res));
        this.user = loginEmploee;
        this.authService.checkRole(loginEmploee.role);
        if (loginEmploee.role === 'user') {
          this.router.navigate(['user']);
          this.router.navigate(['user'], { state: { data: this.user } });

        } else if (loginEmploee.role === 'admin') {
          this.router.navigate(['/admin', 'dashboardAdmin'], { state: { data: this.user } });
        }
      }, error => {
        MaterialService.toast(error.error.massage);
        console.warn(error);
      });
  }
}
