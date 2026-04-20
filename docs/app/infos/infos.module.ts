import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { InfosComponent } from './infos.component';

@NgModule({
  declarations: [InfosComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: InfosComponent }])
  ]
})
export class InfosModule { }
