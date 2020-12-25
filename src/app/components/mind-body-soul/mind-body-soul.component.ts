import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as _ from 'lodash';

import { InternalService } from './../../services/internal.service';
import { GlobalUtilsService } from './../../services/global-utils.service';

@Component({
  selector: 'app-mind-body-soul',
  templateUrl: './mind-body-soul.component.html',
})
export class MindBodySoulComponent implements OnInit {
  souls: Array<any>
  constructor(
    private internalService: InternalService,
    private domSanitizer: DomSanitizer,
    private globalUtilsService: GlobalUtilsService
  ) {
    this.souls = [];
  }

  ngOnInit() {
    this.internalService.getSouls().subscribe((data) => {
      this.souls = _.map(data, (soul) => {
        soul.videos = _.map(soul.itemLinks, (item) => {
          const video:any = {};
          _.forEach(item, (url, title) => {
            video.title = title,
            video.url = this.domSanitizer.bypassSecurityTrustResourceUrl(this.globalUtilsService.youtubeParse(url));
          })
          return video;
        });
        return soul;
      });
    });
  }

}
