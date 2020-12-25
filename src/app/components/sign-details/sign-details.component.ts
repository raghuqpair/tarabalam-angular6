import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';

import { UserService } from './../../services/user.service';
import { InternalService } from './../../services/internal.service';


@Component({
  selector: 'app-sign-details',
  templateUrl: './sign-details.component.html'
})
export class SignDetailsComponent implements OnInit {
  sign: any;
  event: any;
  activeTab: number;
  profile: any;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private internalService: InternalService,
  ) {
    this.profile = {};
    this.userService.user.subscribe((user) => {
      this.profile = user;
    });
    this.sign = {};
    this.activeTab = 1;
    this.event = {};
  }

  ngOnInit() {
    this.route.data.subscribe((data: any) => {
      const event = _.find(data, function (evt) {
        return evt.scheduleEndDate === moment().format('YYYY-MM-DD');
      });
      if(event) this.event = event;
    });

    const month = moment().month() + 1;
    const year = moment().year();
    const signId = this.route.snapshot.paramMap.get('signId');
    this.internalService.getSigns(year, month, 'NY').subscribe(data => {
      const sign = _.find(data, function (s) {
        return s.id === signId;
      });
      this.sign = sign || {};
    });
  }

  showTab(tabNo) {
    this.activeTab = tabNo;
  }

  isActiveTab(tabNo) {
    return this.activeTab === tabNo;
  }

}
