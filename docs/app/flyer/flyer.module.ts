import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { FlyerComponent } from './flyer.component';
import { HandsFootsCareModule } from '../hands-foots-care/hands-foots-care.module';
import { LookModule } from '../look/look.module';
import { FaceCareModule } from '../face-care/face-care.module';
import { BodyCareModule } from '../body-care/body-care.module';
import { SlimmingModule } from '../slimming/slimming.module';
import { PermanentHairRemovalModule } from '../permanent-hair-removal/permanent-hair-removal.module';
import { WaxingModule } from '../waxing/waxing.module';
import { MenModule } from '../men/men.module';
import { PiercingModule } from '../piercing/piercing.module';
import { PermanentModule } from '../permanent/permanent.module';
import { MesotherapyModule } from '../mesotherapy/mesotherapy.module';
import { EventsModule } from '../events/events.module';

@NgModule({
  declarations: [FlyerComponent],
  imports: [
    CommonModule,
    MaterialModule,
    HandsFootsCareModule,
    LookModule,
    FaceCareModule,
    BodyCareModule,
    SlimmingModule,
    PermanentHairRemovalModule,
    WaxingModule,
    MenModule,
    PiercingModule,
    PermanentModule,
    MesotherapyModule,
    EventsModule,
    RouterModule.forChild([{ path: '', component: FlyerComponent }])
  ]
})
export class FlyerModule { }
