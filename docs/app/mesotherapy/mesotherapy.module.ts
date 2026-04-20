import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { MesotherapyComponent } from './mesotherapy.component';

@NgModule({
  declarations: [MesotherapyComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: MesotherapyComponent }])
  ],
  exports: [MesotherapyComponent]
})
export class MesotherapyModule { }
