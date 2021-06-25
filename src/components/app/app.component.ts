import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../model/role';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user!:boolean
  admin!:boolean
  Role = Role;
  constructor(private router: Router, private authService: AuthService) { }
 
  get isAuthorized() {
    return this.authService.isAuthorized();
  }

  get isAdmin() {
    return this.authService.hasRole(Role.Admin);
  }
  
  get isUser() {
    return this.authService.hasRole(Role.User);
  }
  // logout() {
  //   this.authService.logout();
    
  // }
}
