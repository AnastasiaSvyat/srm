import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from './model/role';
import { AuthService } from './services/auth.service';
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
  login(role:Role){
    console.log(role);
    
    this.authService.login(role);
    if(role == 'User'){
      this.router.navigate(['user']);
    }
    else if(role == 'Admin'){
      this.router.navigate(['admin']);
    }
  } 
}
