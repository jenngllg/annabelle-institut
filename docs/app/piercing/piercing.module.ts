import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { PiercingComponent } from './piercing.component';

@NgModule({
  declarations: [PiercingComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: PiercingComponent }])
  ],
  exports: [PiercingComponent]
})
export class PiercingModule { }
