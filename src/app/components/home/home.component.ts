import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import * as _ from 'lodash';
import { CalendarComponent } from 'ng-fullcalendar';
import { BsModalService } from 'ngx-bootstrap/modal';

import { StaticDataService } from './../../services/static-data.service';
import { InternalService } from './../../services/internal.service';
import { GlobalUtilsService } from './../../services/global-utils.service';
import { UserService } from './../../services/user.service';

import { SingleEventComponent } from './../../modals/single-event/single-event.component';
import { BirthdayStarComponent } from './../../modals/birthday-star/birthday-star.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  @ViewChild(CalendarComponent) calendar: CalendarComponent;
  profile: any = {};
  calendarOptions: any;
  special: any = {};
  events: Array<any> = [];
  holidays: Array<any> = [];
  businesses: Array<any>;
  travelMonthArray: Array<any>;
  travelDayArray: Array<any>;
  travelYearArray: Array<any>;
  rasis: Array<any>;
  cities: any;
  mappingCities: any;
  star: string;
  travelStar: string;
  travelCity: string;
  travelYear: string;
  travelDay: string;
  travelMonth: string;
  travelDYear: string;
  travelDCity: string;
  travelDDay: string;
  travelDMonth: string;
  city: string;
  rasi: string;
  currentMonth: any;
  currentYear: any;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private staticData: StaticDataService,
    private internalService: InternalService,
    private globalUtilsService: GlobalUtilsService,
    private modalService: BsModalService,
    private sanitizer: DomSanitizer
  ) {
    this.profile = this.userService.getCurrentUser();
    this.userService.user.subscribe((user) => {
      this.profile = user;
    });
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
    this.travelDayArray = [
      '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
      '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
      '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
    ];
    this.travelYearArray = ['2016', '2017', '2018'];
    this.travelStar = '1';
    this.travelCity = 'NY';
    this.travelYear = '2018';
    this.travelDay = '1';
    this.travelMonth = '7';
    this.travelDYear = '2018';
    this.travelDCity = 'NY';
    this.travelDDay = '1';
    this.travelDMonth = '7';
    this.rasis = [
      'Mesha',
      'Rishaba',
      'Mithuna',
      'Karkataka',
      'Simha',
      'Kanya',
      'Thula',
      'Vrischika',
      'Dhanus',
      'Makra',
      'Khumba',
      'Meena'
    ];
    this.mappingCities = {
      'NewYork': 'NY',
      'Chicago': 'CH',
      'India': 'IN',
      'Los Angeles': 'LA'
    };

    this.cities = [
      'NewYork',
      'Chicago',
      'India',
   
      'Los Angeles'
    ];
    this.star = this.profile.star || this.businesses[0];
    this.city = 'India';
    this.rasi = '1';

    this.calendarOptions = {
      // height: 450,
      editable: true,
      header: {
        // left: 'month basicWeek basicDay agendaWeek agendaDay',
        // center: 'title',
        left: 'title',
        right: 'prev today next',
        events: []
      }
    }
  }

  ngOnInit() {
    this.route.data.subscribe((data: any) => {
      //this.events = this.globalUtilsService.eventsConverter(data.events, 1);
      this.special = { ...data.special, itemVideoLink: this.sanitizer.bypassSecurityTrustResourceUrl(data.special.itemVideoLink) };
    });
  }

  viewRender(e) {
    this.getEvents(e);
  }

  eventClick(e) {
    const initialState:any = {
      event: e.event,
      loggedIn: !!this.profile.id
    };
    this.modalService.show(SingleEventComponent, { initialState,  ignoreBackdropClick: true });
  }

  getEvents(e?) {
    if(e) {
      const firstDay = moment(e.view.calendar.getDate());
      const curMonth = firstDay.get('month')  + 1;
      const curYear = firstDay.get('year');
      this.currentMonth = curMonth;
      this.currentYear = curYear;
    }

    const star = this.businesses.indexOf(this.star) + 1;

    this.internalService.getEvents(this.currentYear, this.currentMonth, this.mappingCities[this.city])
    .subscribe({
      next:(events) => {
        this.events = this.globalUtilsService.eventsConverter(events, star);
      },
      error:(e) => {
        this.events = [];
      }
    });

    this.internalService.getHolidays(this.currentYear, this.currentMonth, this.mappingCities[this.city])
    .subscribe({
      next:(holidays) => {
        this.holidays = holidays;
      },
      error: (e) => {
        this.holidays = [];
      }
    });

  }

  openBirthStarPopup() {
    this.modalService.show(BirthdayStarComponent, { ignoreBackdropClick: true });
  }

}
