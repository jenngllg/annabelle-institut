import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { BodyCareComponent } from './body-care.component';

@NgModule({
  declarations: [BodyCareComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: BodyCareComponent }])
  ],
  exports: [BodyCareComponent]
})
export class BodyCareModule { }
