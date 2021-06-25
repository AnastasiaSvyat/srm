import { Component, OnInit } from '@angular/core';
import { Role } from '../model/role';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor( private authService: AuthService) { }

  ngOnInit(): void {
  }
  get isAdmin() {
    return this.authService.hasRole(Role.Admin);
  }
  
  get isUser() {
    return this.authService.hasRole(Role.User);
  }

}
