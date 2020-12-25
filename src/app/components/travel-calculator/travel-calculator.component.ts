import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';

import { StaticDataService } from './../../services/static-data.service';
import { InternalService } from './../../services/internal.service';
import { GlobalUtilsService } from './../../services/global-utils.service';

@Component({
  selector: 'app-travel-calculator',
  templateUrl: './travel-calculator.component.html',
})
export class TravelCalculatorComponent implements OnInit {
  businesses: Array<string>;
  travelMonthArray: Array<string>;
  travelDayArray: Array<string>;
  cities: Array<any>;
  travelEvents: Array<any>;
  travelDEvents: Array<any>;
  travelArrivalEventDay: Array<any> = [];
  travelDepartureEventDay: Array<any> = [];
  city: string = 'NY';
  travelYearArray: Array<string> = ['2019'];
  travelStar = '1';
  travelCity: string = 'NY';
  travelYear: string = '2019';
  travelDay: string = '';
  travelMonth: number = 6;
  travelDYear: string = '2019';
  travelDCity: string = 'NY';
  travelDDay: string = '';
  travelDMonth: number = 6;
  constructor(
    private staticData: StaticDataService,
    private internalService: InternalService,
    private globalUtilsService: GlobalUtilsService,
  ) {
    this.businesses = this.staticData.businesses;
    this.travelMonthArray = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    this.travelDayArray= [
     '01','02','03','04','05','06','07','08','09','10',
     '11','12','13','14','15','16','17','18','19','20',
     '21','22','23','24','25','26','27','28','29','30','31'
   ];
   this.cities = [
     { name: 'Newyork', value: 'NY' },
     { name: 'Chicago', value: 'CH' },
     { name: 'India', value: 'IN' },
     { name: 'Atlanta', value: 'AT' },
     { name: 'Perth', value: 'PE' },
     { name: 'Los Angeles', value: 'LA' },
   ];

  }

  ngOnInit() {
  }

  starChange() {
    this.getEventArrivalTravel();
    this.getEventDepartureTravel()
  }

  getEventArrivalTravel() {
    if(!this.travelMonth) return false;
    const compareDay = moment([this.travelYear, this.travelMonth, this.travelDay]).format('YYYY-MM-DD');
    this.internalService.getEvents(this.travelYear, this.travelMonth + 1, this.travelCity).subscribe((data) => {
      this.travelEvents = this.globalUtilsService.eventsConverter(data, this.travelStar);
      const travelEvents = [];
      _.forEach(this.travelEvents, (travelEvt) => {
        if (travelEvt.scheduleEndDate === compareDay) {
          travelEvents.push(travelEvt);
        }
      });
      this.travelArrivalEventDay = travelEvents;
    });
  }

  getEventDepartureTravel() {
    if(!this.travelDMonth) return false;
    const compareDay = moment([this.travelYear, this.travelDMonth, this.travelDDay]).format('YYYY-MM-DD');
    this.internalService.getEvents(this.travelYear, this.travelDMonth + 1, this.travelDCity).subscribe((data) => {
      console.log(data);
      this.travelDEvents = this.globalUtilsService.eventsConverter(data, this.travelStar);
      const travelDEvents = [];
      _.forEach(this.travelDEvents, function(travelEvt) {
        if (travelEvt.scheduleEndDate === compareDay) {
          travelDEvents.push(travelEvt);
        }
      })
      this.travelDepartureEventDay = travelDEvents;
    });
  }

}
