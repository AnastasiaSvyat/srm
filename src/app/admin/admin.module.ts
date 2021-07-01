import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminCalendarComponent } from './admin-calendar/admin-calendar.component';
import { AdminStaffListComponent } from './admin-staff-list/admin-staff-list.component';
import { AdminNavBarComponent } from './admin-nav-bar/admin-nav-bar.component';
import { AddEventComponent } from './add-event/add-event.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddTaskComponent } from './add-task/add-task.component';



@NgModule({
  declarations: [
    AdminComponent,
    AdminCalendarComponent,
    AdminStaffListComponent,
    AdminNavBarComponent,
    AddEventComponent,
    AddUserComponent,
    AddTaskComponent

    
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
    

  ]
})
export class AdminModule { }
