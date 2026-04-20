import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { FlyerComponent } from './flyer.component';

@NgModule({
  declarations: [FlyerComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: FlyerComponent }])
  ]
})
export class FlyerModule { }
