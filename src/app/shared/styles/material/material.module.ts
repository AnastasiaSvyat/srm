import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { MatCardModule } from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatRadioModule,
    FormsModule,
    MatFormFieldModule,
    CdkTableModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatSidenavModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatNativeDateModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSnackBarModule,
    ScrollingModule,
    MatCheckboxModule,
    MatBottomSheetModule
  ],
  exports: [
    MatFormFieldModule,
    MatRadioModule,
    CdkTableModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatSidenavModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatNativeDateModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatCardModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSnackBarModule,
    ScrollingModule,
    MatCheckboxModule,
    MatBottomSheetModule
  ]
})
export class MaterialModule { }
