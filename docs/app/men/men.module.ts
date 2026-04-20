import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { MenComponent } from './men.component';

@NgModule({
  declarations: [MenComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: MenComponent }])
  ],
  exports: [MenComponent]
})
export class MenModule { }
