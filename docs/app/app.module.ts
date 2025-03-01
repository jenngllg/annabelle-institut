import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './material.module';
import { Platform } from '@angular/cdk/platform';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconRegistry } from '@angular/material/icon';
import { ScrollStrategyOptions, ScrollDispatcher, ViewportRuler, OverlayContainer, OverlayPositionBuilder, OverlayKeyboardDispatcher } from '@angular/cdk/overlay';
import { Directionality } from '@angular/cdk/bidi';
import { InfosComponent } from './infos/infos.component';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { ContentObserver } from '@angular/cdk/observers';
import { WaxingComponent } from './waxing/waxing.component';
import { FaceCareComponent } from './face-care/face-care.component';
import { BodyCareComponent } from './body-care/body-care.component';
import { MesotherapyComponent } from './mesotherapy/mesotherapy.component';
import { LookComponent } from './look/look.component';
import { MenComponent } from './men/men.component';
import { EventsComponent } from './events/events.component';
import { HandsFootsCareComponent } from './hands-foots-care/hands-foots-care.component';
import { SlimmingComponent } from './slimming/slimming.component';
import { CreationsComponent } from './creations/creations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { LoyaltyProgramComponent } from './loyalty-program/loyalty-program.component';
import { PermanentComponent } from './permanent/permanent.component';
import { BookService } from './book.service';
import { PiercingComponent } from './piercing/piercing.component';
import { FlyerComponent } from './flyer/flyer.component';
import { PermanentHairRemovalComponent } from './permanent-hair-removal/permanent-hair-removal.component';
import { PhotorejuvenationComponent } from './photorejuvenation/photorejuvenation.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    InfosComponent,
    WaxingComponent,
    FaceCareComponent,
    BodyCareComponent,
    MesotherapyComponent,
    LookComponent,
    MenComponent,
    EventsComponent,
    HandsFootsCareComponent,
    SlimmingComponent,
    CreationsComponent,
    LegalNoticeComponent,
    LoyaltyProgramComponent,
    PermanentComponent,
    PiercingComponent,
    FlyerComponent,
    PermanentHairRemovalComponent,
    PhotorejuvenationComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule    
  ],
  providers: [ 
    Platform, 
    MatIconRegistry, 
    ScrollStrategyOptions, 
    ScrollDispatcher,
    ViewportRuler,
    OverlayContainer, 
    OverlayPositionBuilder,
    OverlayKeyboardDispatcher,
    Directionality,
    AutofillMonitor,
    ContentObserver,
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
