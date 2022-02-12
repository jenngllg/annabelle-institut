import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { BodyCareComponent } from './body-care/body-care.component';
import { EventsComponent } from './events/events.component';
import { FaceCareComponent } from './face-care/face-care.component';
import { HandsFootsCareComponent } from './hands-foots-care/hands-foots-care.component';
import { InfosComponent } from './infos/infos.component';
import { LookComponent } from './look/look.component';
import { MenComponent } from './men/men.component';
import { MesotherapyComponent } from './mesotherapy/mesotherapy.component';
import { WaxingComponent } from './waxing/waxing.component';
import { SlimmingComponent } from './slimming/slimming.component';
import { CreationsComponent } from './creations/creations.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { LoyaltyProgramComponent } from './loyalty-program/loyalty-program.component';
import { PermanentComponent } from './permanent/permanent.component';
import { PiercingComponent } from './piercing/piercing.component';
import { SaleTermsComponent } from './sale-terms/sale-terms.component';
import { FlyerComponent } from './flyer/flyer.component';

const routes: Routes = [
  {path:'', pathMatch: 'full', redirectTo: 'home'},
  {path:'home', component: HomeComponent},
  {path:'contact', component: ContactComponent},
  {path:'body-care', component: BodyCareComponent},
  {path:'events', component: EventsComponent},
  {path:'face-care', component: FaceCareComponent},
  {path:'hands-foots-care', component: HandsFootsCareComponent},
  {path:'infos', component: InfosComponent},
  {path:'look', component: LookComponent},
  {path:'men', component: MenComponent},
  {path:'mesotherapy', component: MesotherapyComponent},
  {path:'waxing', component: WaxingComponent},
  {path:'slimming', component: SlimmingComponent},
  {path:'creations', component: CreationsComponent},
  {path:'legal-notice', component: LegalNoticeComponent},
  {path:'loyalty-program', component: LoyaltyProgramComponent},
  {path:'permanent', component: PermanentComponent},
  {path:'piercing', component: PiercingComponent},
  {path:'sale-terms', component: SaleTermsComponent},
  {path:'flyer', component: FlyerComponent},
  {path:'**', pathMatch: 'full', redirectTo: 'home'}, // if incorrect path, go to home page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
