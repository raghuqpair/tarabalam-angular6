import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-daily-mantra',
  templateUrl: './daily-mantra.component.html',
})
export class DailyMantraComponent implements OnInit {
  profile: any;
  specials: any;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private domSanitizer: DomSanitizer,
  ) {
    this.userService.user.subscribe((user) => {
      this.profile = user;
    });
    this.specials = [];
  }

  ngOnInit() {
    this.route.data.subscribe((data: any) => {
      this.specials = _.map(data.specials, (item) => {
        item.itemVideoLink = this.domSanitizer.bypassSecurityTrustResourceUrl(item.itemVideoLink);
        return item;
      });
    });
  }

}
