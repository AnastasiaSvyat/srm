import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingGuard } from './routing/app-routing.guard';
import { SignInComponent } from './sign-in/sign-in.component';



const routes: Routes = [
	{ path: '', component: SignInComponent, pathMatch: 'full' },
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
		]
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: []
})

export class AppRoutingModule { }