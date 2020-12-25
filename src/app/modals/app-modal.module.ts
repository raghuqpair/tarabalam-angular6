import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { SingleEventComponent } from './single-event/single-event.component';
import { BirthdayStarComponent } from './birthday-star/birthday-star.component';
import { EventTimelineComponent } from './event-timeline/event-timeline.component';
import { DobCalculatorComponent } from './dob-calculator/dob-calculator.component';
import { TimeOfBirthComponent } from './time-of-birth/time-of-birth.component';
import { PlaceOfBirthComponent } from './place-of-birth/place-of-birth.component';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    NgSelectModule,
    FormsModule
  ],
  declarations: [
    SingleEventComponent,
    EventTimelineComponent,
    BirthdayStarComponent,
    DobCalculatorComponent,
    TimeOfBirthComponent,
    PlaceOfBirthComponent
  ],
  entryComponents: [
    SingleEventComponent,
    BirthdayStarComponent
  ],
  exports: [
    SingleEventComponent,
    EventTimelineComponent,
    BirthdayStarComponent,
    DobCalculatorComponent,
    TimeOfBirthComponent,
    PlaceOfBirthComponent
  ]
})
export class AppModalModule {
  static forRoot() {
    return {
      ngModule: AppModalModule,
    };
  }
}
