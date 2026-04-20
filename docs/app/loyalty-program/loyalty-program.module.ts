import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { LoyaltyProgramComponent } from './loyalty-program.component';

@NgModule({
  declarations: [LoyaltyProgramComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: LoyaltyProgramComponent }])
  ]
})
export class LoyaltyProgramModule { }
