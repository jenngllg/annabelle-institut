import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { HandsFootsCareComponent } from './hands-foots-care.component';

@NgModule({
  declarations: [HandsFootsCareComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: HandsFootsCareComponent }])
  ],
  exports: [HandsFootsCareComponent]
})
export class HandsFootsCareModule { }
