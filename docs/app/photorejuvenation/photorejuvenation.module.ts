import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { PhotorejuvenationComponent } from './photorejuvenation.component';

@NgModule({
  declarations: [PhotorejuvenationComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: PhotorejuvenationComponent }])
  ]
})
export class PhotorejuvenationModule { }
