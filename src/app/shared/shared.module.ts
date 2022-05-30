import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './styles/material/material.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [],
  imports: [
    FlexLayoutModule,
    MaterialModule,
    NgxPaginationModule,
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    NgxPaginationModule,
  ]
})
export class SharedModule { }
