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
      // {
      //   path: '',
      //   component: HomePageComponent
      // },

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
    path: 'profileUser',
    component: HomePageComponent
  },
  {
    path: 'profileAdmin',
    component: HomePageAdminComponent
  },
  {
    path: 'user',
    // component:HomePageComponent,
    canLoad: [AppRoutingGuard],
    canActivate: [AppRoutingGuard],
    data: {
      roles: [
        Role.User,
      ]
    },
    loadChildren: () => import('./childLoadRouting.module').then(m => m.RoutinstafflistModule),



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
    loadChildren: () => import('./childLoadRouting.module').then(m => m.RoutinstafflistModule)


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
