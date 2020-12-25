import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { EventsResolver } from './resolvers/events.resolver';
import { SpecialResolver } from './resolvers/special.resolver';
import { SpecialsResolver } from './resolvers/specials.resolver';
import { AstroLogersResolver } from './resolvers/astro-logers.resolver';
import { MessageResolver } from './resolvers/message.resolver';
import { CommentsResolver } from './resolvers/comments.resolver';

import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { TravelCalculatorComponent } from './components/travel-calculator/travel-calculator.component';
import { ContactComponent } from './components/contact/contact.component';
import { SignsComponent } from './components/signs/signs.component';
import { SignDetailsComponent } from './components/sign-details/sign-details.component';
import { HolidaysComponent } from './components/holidays/holidays.component';
import { HolidayDetailsComponent } from './components/holiday-details/holiday-details.component';
import { MindBodySoulComponent } from './components/mind-body-soul/mind-body-soul.component';
import { DailyMantraComponent } from './components/daily-mantra/daily-mantra.component';
import { AboutComponent } from './components/about/about.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MessageNewComponent } from './components/message-new/message-new.component';
import { MessageDetailsComponent } from './components/message-details/message-details.component';

import { AuthService } from './services/auth.service';


const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [],
    resolve: {
      special: SpecialResolver
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [],
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent,
    canActivate: [],
  },
  {
    path: 'travel-calculator',
    component: TravelCalculatorComponent,
    canActivate: [],
  },
  {
    path: 'contact',
    component: ContactComponent,
    canActivate: [],
  },
  {
    path: 'signs',
    component: SignsComponent,
    canActivate: [ AuthService ],
  },
  {
    path: 'signs/:signId',
    component: SignDetailsComponent,
    canActivate: [ AuthService ],
    resolve: {
      events: EventsResolver
    },
  },
  {
    path: 'holidays',
    component: HolidaysComponent,
    canActivate: [],
  },
  {
    path: 'holidays/:holidayId',
    component: HolidayDetailsComponent,
    canActivate: [],
  },
  {
    path: 'mind-body-soul',
    component: MindBodySoulComponent,
    canActivate: [],
  },
  {
    path: 'daily-mantra',
    component: DailyMantraComponent,
    canActivate: [],
    resolve: {
      specials: SpecialsResolver
    },
  },
  {
    path: 'about-us',
    component: AboutComponent,
    canActivate: [],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthService ],
  },
  {
    path: 'messages',
    component: MessagesComponent,
    canActivate: [ AuthService ],
    resolve: {
      astrologers: AstroLogersResolver
    },
  },
  {
    path: 'messages/new',
    component: MessageNewComponent,
    canActivate: [ AuthService ]
  },
  {
    path: 'messages/:id',
    component: MessageDetailsComponent,
    canActivate: [ AuthService ],
    resolve: {
      message: MessageResolver,
      comments: CommentsResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [ EventsResolver, SpecialResolver, SpecialsResolver, AstroLogersResolver, MessageResolver, CommentsResolver ]
})
export class AppRoutingModule {}
