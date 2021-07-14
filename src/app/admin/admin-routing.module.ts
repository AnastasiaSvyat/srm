import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';
import { AdminStaffListComponent } from './admin-staff-list/admin-staff-list.component';
import { AdminCalendarComponent } from './admin-calendar/admin-calendar.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { MsgAdminComponent } from './msg-admin/msg-admin.component';

export const routes: Routes = [
  { path: '', component: AdminComponent , children: [
    { path: 'stafflist', component: AdminStaffListComponent },
    { path: 'calendar', component: AdminCalendarComponent },
    { path: 'messageAdmin', component: MsgAdminComponent },
    { path: 'dashboardAdmin', component: DashboardAdminComponent },
    { path: '', redirectTo:'dashboardAdmin', pathMatch:'full'},
    { path: '**', redirectTo:'dashboardAdmin' ,},

  ]},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)],
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
