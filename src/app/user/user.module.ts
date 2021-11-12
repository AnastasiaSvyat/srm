import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserStaffListComponent } from './user-staff-list/user-staff-list.component';
import { UserCalendarComponent } from './user-calendar/user-calendar.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { MsgUserComponent } from './msg-user/msg-user.component';
import { AddInfoUserComponent } from './add-info-user/add-info-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';


@NgModule({
  declarations: [
    UserComponent,
    UserStaffListComponent,
    UserCalendarComponent,
    DashboardUserComponent,
    MsgUserComponent,
    AddInfoUserComponent,
    UpdateUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
  ]
})
export class UserModule { }
