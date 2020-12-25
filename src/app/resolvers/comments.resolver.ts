import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { MessageService } from './../services/message.service';

@Injectable()
export class CommentsResolver implements Resolve<Observable<any>|Promise<any>> {
  constructor(
    private messageService: MessageService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.params.id;
    return this.messageService.getComment(id);
  }
}
