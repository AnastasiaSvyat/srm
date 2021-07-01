import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {CdkTableModule} from '@angular/cdk/table';



@NgModule({
  declarations: [],
  imports: [
    MatFormFieldModule,
    CdkTableModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatSidenavModule, 
    MatDatepickerModule,
    MatButtonModule,
    MatInputModule,
    MatNativeDateModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSelectModule
  ],
  exports:[
    MatFormFieldModule,
    CdkTableModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatSidenavModule, 
    MatDatepickerModule,
    MatButtonModule,
    MatInputModule,
    MatNativeDateModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSelectModule
  ]
})
export class SharedModule { }
