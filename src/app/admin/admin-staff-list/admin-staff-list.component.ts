import { Component, OnInit } from '@angular/core';
import { AddUserComponent } from '../add-user/add-user.component';
import {MatDialog} from '@angular/material/dialog';


export interface StaffList {
  photo:string;
  name: string;
  position: string;
  birth:string;
  phone:string;
  email:string;
  skype:string;

}


const STAFFLIST: StaffList[] = [
    {photo: '/assets/img/people.png', name: 'Hellen Miky', position: 'Designer', birth: '24/12/95',phone:'+38 (063) 652 99 55',email:'hellenmiky@gmail.com',skype:'hellenmiky'},
    {photo: '/assets/img/people.png', name: 'Hellen Miky', position: 'Designer', birth: '24/12/95',phone:'+38 (063) 652 99 55',email:'hellenmiky@gmail.com',skype:'hellenmiky'},
    {photo: '/assets/img/people.png', name: 'Hellen Miky', position: 'Designer',birth: '24/12/95',phone:'+38 (063) 652 99 55',email:'hellenmiky@gmail.com',skype:'hellenmiky'},
    {photo: '/assets/img/people.png', name: 'Hellen Miky', position: 'Designer',birth: '24/12/95',phone:'+38 (063) 652 99 55',email:'hellenmiky@gmail.com',skype:'hellenmiky'},
    {photo: '/assets/img/people.png', name: 'Hellen Miky', position: 'Designer', birth: '24/12/95',phone:'+38 (063) 652 99 55',email:'hellenmiky@gmail.com',skype:'hellenmiky'},
    {photo: '/assets/img/people.png', name: 'Hellen Miky', position: 'Designer', birth: '24/12/95',phone:'+38 (063) 652 99 55',email:'hellenmiky@gmail.com',skype:'hellenmiky'},
    {photo: '/assets/img/people.png', name: 'Hellen Miky',position: 'Designer', birth: '24/12/95',phone:'+38 (063) 652 99 55',email:'hellenmiky@gmail.com',skype:'hellenmiky'},
    {photo: '/assets/img/people.png', name: 'Hellen Miky', position: 'Designer', birth: '24/12/95',phone:'+38 (063) 652 99 55',email:'hellenmiky@gmail.com',skype:'hellenmiky'},
    {photo: '/assets/img/people.png', name: 'Hellen Miky', position: 'Designer', birth: '24/12/95',phone:'+38 (063) 652 99 55',email:'hellenmiky@gmail.com',skype:'hellenmiky'},
    {photo: '/assets/img/people.png', name: 'Hellen Miky',position: 'Designer', birth: '24/12/95',phone:'+38 (063) 652 99 55',email:'hellenmiky@gmail.com',skype:'hellenmiky'},
  ];


@Component({
  selector: 'app-admin-staff-list',
  templateUrl: './admin-staff-list.component.html',
  styleUrls: ['./admin-staff-list.component.css']
})
export class AdminStaffListComponent implements OnInit {

  constructor(public dialog: MatDialog ) { }

  ngOnInit(): void {
  }
  addUser(){
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '398px',
      // height :'791px',
  });
}
displayedColumns: string[] = ['name','position', 'birth','phone','email','skype'];
dataSource = STAFFLIST;
}
