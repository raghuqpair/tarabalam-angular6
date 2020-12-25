import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { InternalService } from './../../services/internal.service';

@Component({
  selector: 'app-signs',
  templateUrl: './signs.component.html',
})
export class SignsComponent implements OnInit {
  signs:Array<any> = [];
  constructor(
    private internalService: InternalService
  ) { }

  ngOnInit() {
    const month = moment().month() + 1;
    const year = moment().year();
    this.internalService.getSigns(year, month, 'NY').subscribe(data => {
      this.signs = data;
    });
  }

}
