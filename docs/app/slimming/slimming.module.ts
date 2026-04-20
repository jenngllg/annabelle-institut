import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { SlimmingComponent } from './slimming.component';

@NgModule({
  declarations: [SlimmingComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: SlimmingComponent }])
  ],
  exports: [SlimmingComponent]
})
export class SlimmingModule { }
