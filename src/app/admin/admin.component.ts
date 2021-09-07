import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../model/Employee';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
employee!:Employee;
constructor(private route :Router) {
  this.employee = history.state.data
  console.log(history.state.data);
 }

  ngOnInit(): void {
    
    console.log(this.employee);
  
    
  }
 

}
