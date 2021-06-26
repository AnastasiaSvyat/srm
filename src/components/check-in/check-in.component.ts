import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Role } from '../model/role';
import { AuthService } from '../services/auth.service';
import { routes } from '../routing/childLoad.module';


@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent implements OnInit {
  user!:boolean
  admin!:boolean
  Role = Role;

  constructor( private router: Router , private authService: AuthService) { }

  ngOnInit(): void {
  }
    login(role:Role){
      console.log(role);
      
      this.authService.login(role);
      if(role == 'User'){
        this.router.navigate(['/profileUser']);
      }
      else if(role == 'Admin'){
        this.router.navigate(['/profileAdmin']);
      }
    } 
   

}
