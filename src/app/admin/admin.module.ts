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
    AdminUpdatePasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
  ]
})

export class AdminModule { }
