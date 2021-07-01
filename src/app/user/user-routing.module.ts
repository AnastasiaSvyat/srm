import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserComponent } from './user.component';
import { Routes, RouterModule } from '@angular/router';
import { UserStaffListComponent } from './user-staff-list/user-staff-list.component';
import { UserCalendarComponent } from './user-calendar/user-calendar.component';
import { AppRoutingGuard } from 'src/app/routing/app-routing.guard';

export const routes: Routes = [
  { path: 'stafflist', component: UserStaffListComponent ,},
  { path: 'calendar', component: UserCalendarComponent ,},
  { path: '', component: UserComponent },
  


];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)],
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
