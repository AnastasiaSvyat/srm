import { Routes } from '@angular/router';
import { StaffListComponent } from '../staff-list/staff-list.component';
import { CalendarComponent } from '../calendar/calendar.component';

export const routes: Routes = [
    { path: 'stafflist', component: StaffListComponent },
    { path: 'calendar', component: CalendarComponent }

];
