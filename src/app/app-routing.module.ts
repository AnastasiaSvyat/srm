import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingGuard } from './routing/app-routing.guard';



const routes: Routes = [
  {
    path: '',
    children: [
    
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
        canLoad: [AppRoutingGuard],
        canActivate: [AppRoutingGuard],
      },

      {
        path: 'admin',
        loadChildren: () => import('../app/admin/admin.module').then(m => m.AdminModule),
        canLoad: [AppRoutingGuard],
        canActivate: [AppRoutingGuard],
      },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule { }
