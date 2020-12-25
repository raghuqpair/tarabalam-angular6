import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

import { UserService } from './../services/user.service';
@Injectable()
export class AstroLogersResolver implements Resolve<Observable<any>|Promise<any>> {
  constructor(
    private userService: UserService
  ) {
  }

  resolve() {
    const user = this.userService.getCurrentUser();
    if(user && user.role === 'ADMIN') {
      return this.userService.getAstroLogers();
    }
    return Promise.resolve([]);
  }
}
