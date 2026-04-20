import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { PermanentHairRemovalComponent } from './permanent-hair-removal.component';

@NgModule({
  declarations: [PermanentHairRemovalComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: PermanentHairRemovalComponent }])
  ],
  exports: [PermanentHairRemovalComponent]
})
export class PermanentHairRemovalModule { }
