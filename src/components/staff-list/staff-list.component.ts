import { Component, OnInit, ViewChild } from '@angular/core';


// export interface StaffList {
//   photo:string;
//   name: string;
//   positiin: string;
//   birth:string;
//   salary:string;
//   firstDate:string;
//   lastPerf:string;
//   phone:string;
//   email:string;
//   cv:string;
//   change:string;

// }
export interface DataElement {
  name: string;
  position: number;
  weight: number;
  height: number;
}


@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})





export class StaffListComponent implements OnInit {
  
  //  staff: StaffList[] = [
  //   {photo: '/assets/img/people.png', name: 'Hellen Miky', positiin: 'Designer', birth: '24/12/95',salary:'200$',firstDate:'24/12/2020',lastPerf:'15/05/2021',phone:'+38 (063) 652 99 55',email:'hellenmiky@gmail.com',cv:'CV',change:'chanhe log'},
  //   {photo: '/assets/img/people.png', name: 'Hellen Miky', positiin: 'Designer', birth: '24/12/95',salary:'200$',firstDate:'24/12/2020',lastPerf:'15/05/2021',phone:'+38 (063) 652 99 55',email:'hellenmiky@gmail.com',cv:'CV',change:'chanhe log'},
  //   {photo: '/assets/img/people.png', name: 'Hellen Miky', positiin: 'Designer',birth: '24/12/95',salary:'200$',firstDate:'24/12/2020',lastPerf:'15/05/2021',phone:'+38 (063) 652 99 55',email:'hellenmiky@gmail.com',cv:'CV',change:'chanhe log'},
  //   {photo: '/assets/img/people.png', name: 'Hellen Miky', positiin: 'Designer',birth: '24/12/95',salary:'200$',firstDate:'24/12/2020',lastPerf:'15/05/2021',phone:'+38 (063) 652 99 55',email:'hellenmiky@gmail.com',cv:'CV',change:'chanhe log'},
  //   {photo: '/assets/img/people.png', name: 'Hellen Miky', positiin: 'Designer', birth: '24/12/95',salary:'200$',firstDate:'24/12/2020',lastPerf:'15/05/2021',phone:'+38 (063) 652 99 55',email:'hellenmiky@gmail.com',cv:'CV',change:'chanhe log'},
  //   {photo: '/assets/img/people.png', name: 'Hellen Miky', positiin: 'Designer', birth: '24/12/95',salary:'200$',firstDate:'24/12/2020',lastPerf:'15/05/2021',phone:'+38 (063) 652 99 55',email:'hellenmiky@gmail.com',cv:'CV',change:'chanhe log'},
  //   {photo: '/assets/img/people.png', name: 'Hellen Miky',positiin: 'Designer', birth: '24/12/95',salary:'200$',firstDate:'24/12/2020',lastPerf:'15/05/2021',phone:'+38 (063) 652 99 55',email:'hellenmiky@gmail.com',cv:'CV',change:'chanhe log'},
  //   {photo: '/assets/img/people.png', name: 'Hellen Miky', positiin: 'Designer', birth: '24/12/95',salary:'200$',firstDate:'24/12/2020',lastPerf:'15/05/2021',phone:'+38 (063) 652 99 55',email:'hellenmiky@gmail.com',cv:'CV',change:'chanhe log'},
  //   {photo: '/assets/img/people.png', name: 'Hellen Miky', positiin: 'Designer', birth: '24/12/95',salary:'200$',firstDate:'24/12/2020',lastPerf:'15/05/2021',phone:'+38 (063) 652 99 55',email:'hellenmiky@gmail.com',cv:'CV',change:'chanhe log'},
  //   {photo: '/assets/img/people.png', name: 'Hellen Miky',positiin: 'Designer', birth: '24/12/95',salary:'200$',firstDate:'24/12/2020',lastPerf:'15/05/2021',phone:'+38 (063) 652 99 55',email:'hellenmiky@gmail.com',cv:'CV',change:'chanhe log'},
  // ];
  constructor() { }

  ngOnInit(): void {
  }
  dataElement: DataElement[] = [
    {position: 1, name: 'Hy', weight: 1.0079, height: 3.33},
    {position: 2, name: 'He', weight: 4.0026, height: 4.21},
    {position: 3, name: 'Li', weight: 6.941, height: 10.1},
    {position: 4, name: 'Be', weight: 9.0122, height: 11},
    {position: 5, name: 'Bo', weight: 10.811, height: 85},
    {position: 6, name: 'Ca', weight: 12.0107, height: 8.5},
    {position: 7, name: 'Ni', weight: 14.0067, height: 85.1},
    {position: 8, name: 'Ox', weight: 15.9994, height: 0.85},
    {position: 9, name: 'Fl', weight: 18.9984, height: 123},
    {position: 10, name: 'Ne', weight: 2110.1797, height: 8}
  ];

  columns = [
    {columnDef: 'position', header: 'No.', cell: (element: DataElement) => `${element.position}`},
    {columnDef: 'name', header: 'Name', cell: (element: DataElement) => `${element.name}`},
    {columnDef: 'weight', header: 'Weight', cell: (element: DataElement) => `${element.weight}`},
    {columnDef: 'height', header: 'Height', cell: (element: DataElement) => `${element.height}`},
    // {columnDef: 'result', header: 'Result', cell: (element: DataElement) => `${element.result}`}
  ];

  displayedColumns = this.columns.map(result => result.columnDef);

  dataSource = this.dataElement;
  // displayedColumns: string[] = ['photo','name','position', 'birth', 'salary','firstDate','lastPerf','phone','email','cv','change'];
  // dataSource = this.staff;
}
