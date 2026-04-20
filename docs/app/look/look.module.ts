import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { LookComponent } from './look.component';

@NgModule({
  declarations: [LookComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: LookComponent }])
  ],
  exports: [LookComponent]
})
export class LookModule { }
