import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminCalendarComponent } from './admin-calendar/admin-calendar.component';
import { AdminStaffListComponent } from './admin-staff-list/admin-staff-list.component';
import { AddEventComponent } from './add-event/add-event.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { MsgAdminComponent } from './msg-admin/msg-admin.component';
import { InfoAboutUserComponent } from './info-about-user/info-about-user.component';
import { DescriptionEventComponent } from './description-event/description-event.component';
import { AdminOpenMenuComponentComponent } from './admin-open-menu-component/admin-open-menu-component.component';
import { AdminUpdatePasswordComponent } from './admin-update-password/admin-update-password.component';
import { AdminLogTimeComponent } from './admin-log-time/admin-log-time.component';
import { AdminAddStandartHoursComponent } from './admin-add-standart-hours/admin-add-standart-hours.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AdminLogTimeDetailsComponent } from './admin-log-time/admin-log-time-details/admin-log-time-details.component';
import { AdminSettingComponent } from './admin-setting/admin-setting.component';
import { AdminRequestComponent } from './admin-request/admin-request.component';
import { AdddRequestComponent } from './admin-request/addd-request/addd-request.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AdminComponent,
    DashboardAdminComponent,
    AdminCalendarComponent,
    AdminStaffListComponent,
    AddEventComponent,
    AddUserComponent,
    AddTaskComponent,
    MsgAdminComponent,
    InfoAboutUserComponent,
    DescriptionEventComponent,
    AdminOpenMenuComponentComponent,
    AdminUpdatePasswordComponent,
    AdminLogTimeComponent,
    AdminAddStandartHoursComponent,
    AdminUpdatePasswordComponent,
    AdminLogTimeDetailsComponent,
    AdminSettingComponent,
    AdminRequestComponent,
    AdddRequestComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    PerfectScrollbarModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})

export class AdminModule { }
