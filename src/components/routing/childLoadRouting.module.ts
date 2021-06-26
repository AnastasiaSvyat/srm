import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffListComponent } from '../staff-list/staff-list.component';
import { routes } from './childLoad.module';
import { RouterModule } from '@angular/router';
import { CalendarComponent } from '../calendar/calendar.component';



@NgModule({
  declarations: [
    StaffListComponent,
    CalendarComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class RoutinstafflistModule { }
