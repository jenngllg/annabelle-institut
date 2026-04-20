import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { WaxingComponent } from './waxing.component';

@NgModule({
  declarations: [WaxingComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: WaxingComponent }])
  ],
  exports: [WaxingComponent]
})
export class WaxingModule { }
