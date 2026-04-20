import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { EventsComponent } from './events.component';

@NgModule({
  declarations: [EventsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: EventsComponent }])
  ],
  exports: [EventsComponent]
})
export class EventsModule { }
