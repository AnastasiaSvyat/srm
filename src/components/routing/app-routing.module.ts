import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from '../home-page/home-page.component';
import { HomePageAdminComponent } from '../home-page-admin/home-page-admin.component';
import { CheckInComponent } from '../check-in/check-in.component';
import { StaffListComponent } from '../staff-list/staff-list.component';
import { AppComponent } from '../app/app.component';

import { AppRoutingGuard } from './app-routing.guard';
import { AuthService } from '../services/auth.service';

import { Role } from '../model/role';


const routes: Routes = [
  {
    path: '',
    children: [
   

      {
        path: 'staffList',
        canActivate: [AppRoutingGuard],
        component: StaffListComponent
      },

      
    ]
  },
  {
    path: 'login',
    component: CheckInComponent
  },
  {
    path: 'user',
    canLoad: [AppRoutingGuard],
    canActivate: [AppRoutingGuard],
    data: {
      roles: [
        Role.User,
      ]
    },
    loadChildren: () => import('../staff-list/routinstafflist.module').then(m => m.RoutinstafflistModule)


  },
  {
    path: 'admin',
    canLoad: [AppRoutingGuard],
    canActivate: [AppRoutingGuard],
    data: {
      roles: [
        Role.Admin,
      ]
    },
    loadChildren: () => import('../staff-list/routinstafflist.module').then(m => m.RoutinstafflistModule)


  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AppRoutingGuard,
    AuthService
  ]
})
export class AppRoutingModule { }
