import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

import { InternalService } from './../services/internal.service';
import { UserService } from './../services/user.service';
import { GlobalUtilsService } from './../services/global-utils.service';
import { StaticDataService } from './../services/static-data.service';

@Injectable()
export class EventsResolver implements Resolve<Observable<any>> {
  constructor(
    private internalService: InternalService,
    private userService: UserService,
    private globalUtilsService: GlobalUtilsService,
    private staticDataService: StaticDataService,
  ) {

  }

  resolve() {
    const year = moment().year();
    const month = moment().month() +  1;
    const city = 'NY';
    return this.internalService.getEvents(year, month, city)
    .pipe(
      map(data => {
        let star ='1';
        const authUser = this.userService.getCurrentUser();
        if(authUser && authUser.id) {
          const index = _.findIndex(this.staticDataService.businesses, function (business) {
            return business === authUser.star;
          });
          if(index !== -1) {
            star = '' + index + 1;
          }
        }
        return this.globalUtilsService.eventsConverter(data, star);
      })
    );
  }
}
