import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';
import { AdminStaffListComponent } from './admin-staff-list/admin-staff-list.component';
import { AdminCalendarComponent } from './admin-calendar/admin-calendar.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { MsgAdminComponent } from './msg-admin/msg-admin.component';
import { AdminLogTimeComponent } from './admin-log-time/admin-log-time.component';
import { AdminSettingComponent } from './admin-setting/admin-setting.component';
import { AdminRequestComponent } from './admin-request/admin-request.component';

export const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: 'stafflist', component: AdminStaffListComponent },
      { path: 'calendar', component: AdminCalendarComponent },
      { path: 'messageAdmin', component: AdminRequestComponent },
      { path: 'requestList', component: MsgAdminComponent },
      { path: 'dashboardAdmin', component: DashboardAdminComponent },
      { path: 'logTime', component: AdminLogTimeComponent },
      { path: 'setting', component: AdminSettingComponent },
      { path: '', redirectTo: 'dashboardAdmin', pathMatch: 'full' },
      { path: '**', redirectTo: 'dashboardAdmin', },
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
export class AdminRoutingModule { }
