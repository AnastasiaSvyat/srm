import { NgModule, CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AppRoutingModule } from '../routing/app-routing.module';
import { AppComponent } from './app.component';
import { CheckInComponent } from '../check-in/check-in.component';
import { HomePageComponent } from '../home-page/home-page.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { HomePageAdminComponent } from '../home-page-admin/home-page-admin.component';
import {MatIconModule} from '@angular/material/icon';
import { AddEventComponent } from '../add-event/add-event.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { AddTaskComponent } from '../add-task/add-task.component';
import { CdkTableModule} from '@angular/cdk/table';
import {DataSource} from '@angular/cdk/table';



@NgModule({
  declarations: [
    AppComponent,
    CheckInComponent,
    HomePageComponent,
    NavBarComponent,
    HomePageAdminComponent,
    AddEventComponent,
    AddTaskComponent
    
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA,
   
  ],
  imports: [
    MatFormFieldModule,
    CdkTableModule,
    MatTableModule,
    MatIconModule,
    BrowserModule,
    MatDialogModule,
    AppRoutingModule,
    MatSidenavModule, 
   
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatButtonModule,
    MatInputModule,
    MatNativeDateModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
