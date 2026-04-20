import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { PermanentComponent } from './permanent.component';

@NgModule({
  declarations: [PermanentComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: PermanentComponent }])
  ],
  exports: [PermanentComponent]
})
export class PermanentModule { }
