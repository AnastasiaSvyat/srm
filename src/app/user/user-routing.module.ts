import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserComponent } from './user.component';
import { Routes, RouterModule } from '@angular/router';
import { UserStaffListComponent } from './user-staff-list/user-staff-list.component';
import { UserCalendarComponent } from './user-calendar/user-calendar.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { MsgUserComponent } from './msg-user/msg-user.component';

export const routes: Routes = [
  {
    path: '', component: UserComponent, children: [
      { path: 'stafflist', component: UserStaffListComponent },
      { path: 'calendar', component: UserCalendarComponent },
      { path: 'dashboardUser', component: DashboardUserComponent },
      { path: 'messageUser', component: MsgUserComponent },
      { path: '', redirectTo: 'dashboardUser', pathMatch: 'full' },
      { path: '**', redirectTo: 'dashboardUser' },
    ]
  },
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
