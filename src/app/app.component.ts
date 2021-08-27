import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from './model/role';
import { CrudService } from './services/crud.service';
import { FormGroup, FormBuilder } from "@angular/forms";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  user!:boolean
  admin!:boolean
  Role = Role;
  employeeLoginForm!: FormGroup;
  
  constructor(private router: Router,
    public formBuilder: FormBuilder,
     private crudService: CrudService

     ) { 
       this.employeeLoginForm = this.formBuilder.group({
        email: [''],
        password: [''],
      })
     }
 
  get isAuthorized() {
    return this.crudService.isAuthorized();
  }
  
  loginEmployee(): void {
    console.log(this.employeeLoginForm.value);
    
    this.crudService.Login(this.employeeLoginForm.value)
      .subscribe((res) => {
        const loginEmploee = JSON.parse(JSON.stringify(res))
         this.crudService.checkRole(loginEmploee.role);
          if(loginEmploee.role === 'User'){
              this.router.navigate(['user']);
          }else if(loginEmploee.role === 'Admin'){
              this.router.navigate(['admin']);
          }})
  } 
}