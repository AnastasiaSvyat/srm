import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-calendar',
  templateUrl: './user-calendar.component.html',
  styleUrls: ['./user-calendar.component.scss']
})
export class UserCalendarComponent implements OnInit {
  selected!: Date | null;
  
  constructor() { }

  ngOnInit(): void {
  }
}
