import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {
  MatNativeDateModule,
  MatDatepickerModule
} from '@angular/material';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from 'ng-fullcalendar';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AppRoutingModule } from './app-routing.module';
import { ServiceModule } from './services/service.module';
import { AppModalModule } from './modals/app-modal.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    ResetPasswordComponent,
    TravelCalculatorComponent,
    ContactComponent,
    SignsComponent,
    SignDetailsComponent,
    HolidaysComponent,
    HolidayDetailsComponent,
    MindBodySoulComponent,
    DailyMantraComponent,
    AboutComponent,
    ProfileComponent,
    MessagesComponent,
    MessageNewComponent,
    MessageDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule.forRoot(),
    AppRoutingModule,
    ServiceModule.forRoot(),
    ModalModule.forRoot(),
    AppModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
