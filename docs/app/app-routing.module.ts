import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'body-care', loadChildren: () => import('./body-care/body-care.module').then(m => m.BodyCareModule) },
  { path: 'events', loadChildren: () => import('./events/events.module').then(m => m.EventsModule) },
  { path: 'face-care', loadChildren: () => import('./face-care/face-care.module').then(m => m.FaceCareModule) },
  { path: 'hands-foots-care', loadChildren: () => import('./hands-foots-care/hands-foots-care.module').then(m => m.HandsFootsCareModule) },
  { path: 'infos', loadChildren: () => import('./infos/infos.module').then(m => m.InfosModule) },
  { path: 'look', loadChildren: () => import('./look/look.module').then(m => m.LookModule) },
  { path: 'men', loadChildren: () => import('./men/men.module').then(m => m.MenModule) },
  { path: 'mesotherapy', loadChildren: () => import('./mesotherapy/mesotherapy.module').then(m => m.MesotherapyModule) },
  { path: 'waxing', loadChildren: () => import('./waxing/waxing.module').then(m => m.WaxingModule) },
  { path: 'permanent-hair-removal', loadChildren: () => import('./permanent-hair-removal/permanent-hair-removal.module').then(m => m.PermanentHairRemovalModule) },
  { path: 'photorejuvenation', loadChildren: () => import('./photorejuvenation/photorejuvenation.module').then(m => m.PhotorejuvenationModule) },
  { path: 'slimming', loadChildren: () => import('./slimming/slimming.module').then(m => m.SlimmingModule) },
  { path: 'creations', loadChildren: () => import('./creations/creations.module').then(m => m.CreationsModule) },
  { path: 'legal-notice', loadChildren: () => import('./legal-notice/legal-notice.module').then(m => m.LegalNoticeModule) },
  { path: 'loyalty-program', loadChildren: () => import('./loyalty-program/loyalty-program.module').then(m => m.LoyaltyProgramModule) },
  { path: 'permanent', loadChildren: () => import('./permanent/permanent.module').then(m => m.PermanentModule) },
  { path: 'piercing', loadChildren: () => import('./piercing/piercing.module').then(m => m.PiercingModule) },
  { path: 'flyer', loadChildren: () => import('./flyer/flyer.module').then(m => m.FlyerModule) },
  { path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
