import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { FaceCareComponent } from './face-care.component';

@NgModule({
  declarations: [FaceCareComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: FaceCareComponent }])
  ],
  exports: [FaceCareComponent]
})
export class FaceCareModule { }
