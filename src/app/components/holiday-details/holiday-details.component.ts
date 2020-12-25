import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';

import { InternalService } from './../../services/internal.service';

@Component({
  selector: 'app-holiday-details',
  templateUrl: './holiday-details.component.html',
})
export class HolidayDetailsComponent implements OnInit {
  holiday: Array<any>;
  holidayId: any;
  constructor(
    private route: ActivatedRoute,
    private internalService: InternalService
  ) {
    this.holiday = [];
  }

  ngOnInit() {
     this.holidayId = this.route.snapshot.paramMap.get('holidayId');

     const month = moment().month() + 1;
     const year = moment().year();
     this.internalService.getHoliday(year, month, '2_NY').subscribe((data) => {
       this.holiday = _.map(data);
     });
  }
}
