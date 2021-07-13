import { Component, OnInit } from '@angular/core';
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
  selector: 'app-user-staff-list',
  templateUrl: './user-staff-list.component.html',
  styleUrls: ['./user-staff-list.component.scss']
})
export class UserStaffListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
 
displayedColumns: string[] = ['name','position', 'birth','phone','email','skype'];
dataSource = STAFFLIST;

}
