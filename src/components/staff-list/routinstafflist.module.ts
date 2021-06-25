import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffListComponent } from './staff-list.component';
import { routes } from './stafflist.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    StaffListComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class RoutinstafflistModule { }
