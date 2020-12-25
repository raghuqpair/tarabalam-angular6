import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { InternalService } from './../../services/internal.service'

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
})
export class HolidaysComponent implements OnInit {
  holidays: Array<any>;
  constructor(
    private internalService: InternalService
  ) {
    this.holidays = [];
  }

  ngOnInit() {
    const year = moment().year();
    const month =  moment().month() + 1;
    this.internalService.getHolidays(year, month, 'NY').subscribe((data) => {
      this.holidays = data;
    });
  }

}
