import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminCalendarComponent } from './admin-calendar/admin-calendar.component';
import { AdminStaffListComponent } from './admin-staff-list/admin-staff-list.component';
import { AddEventComponent } from './add-event/add-event.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddTaskComponent } from './add-task/add-task.component';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';




@NgModule({
  declarations: [
    AdminComponent,
    DashboardAdminComponent,
    AdminCalendarComponent,
    AdminStaffListComponent,
    AddEventComponent,
    AddUserComponent,
    AddTaskComponent,

    
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    // FlexLayoutModule
    

  ]
})
export class AdminModule { }
