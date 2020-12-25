import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import * as moment from 'moment';

@Injectable()
export class SpecialResolver implements Resolve<Observable<any>> {
  constructor(
    private http: HttpClient
  ) {
  }

  resolve() {
    const url  = 'https://s3.amazonaws.com/tarabalam/specials.json';
    return this.http.get(url)
    .pipe(
      map((resp: any) => {
        return _.find(resp, (item) => {
          return item.itemWeek === moment().format('dddd');
        })
      })
    );
  }
}
