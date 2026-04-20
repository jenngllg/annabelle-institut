import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { CreationsComponent } from './creations.component';

@NgModule({
  declarations: [CreationsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: CreationsComponent }])
  ]
})
export class CreationsModule { }
