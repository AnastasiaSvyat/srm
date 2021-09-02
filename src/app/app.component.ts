import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from './model/role';
import { CrudService } from './services/crud.service';
import { FormGroup, FormBuilder } from "@angular/forms";
import { MaterialService } from './services/material.service';
import { Employee } from './model/Employee';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  user!:Employee
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
    
    this.crudService.Login(this.employeeLoginForm.value)
      .subscribe((res) => {
        console.log(res);
        const loginEmploee = JSON.parse(JSON.stringify(res))
        this.user = loginEmploee
        console.log(this.user);
        this.crudService.checkRole(loginEmploee.role);
          if(loginEmploee.role === 'user'){
              this.router.navigate(['user']);
          }else if(loginEmploee.role === 'admin'){
              this.router.navigate(['admin',{user:this.user}]);
          }},error =>{
              MaterialService.toast(error.error.massage);
              console.warn(error)
              
          })
  } 
}