import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import swal from 'sweetalert';

import { MessageService } from './../services/message.service';
import { UserService } from './../services/user.service';

@Injectable()
export class MessageResolver implements Resolve<Observable<any>|Promise<any>> {
  constructor(
    private router: Router,
    private messageService: MessageService,
    private userService: UserService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.params.id;
    const currentUser = this.userService.getCurrentUser();
    return new Promise((resolve, reject) => {
      return this.messageService.getById(id).subscribe({
        next: (message) => {
          if(message) {
             if((currentUser.role == 'USER' && message.createdById != currentUser.id) || (currentUser.role == 'ASTROLOGER' && message.astrologerId != currentUser.id)) {
                return this.reject(reject, 'You don\'t have permission to view this message');
             } else {
               return resolve(message);
             }
          };
          return this.reject(reject);
        },
        error: () => this.reject(reject)
      })
    })
  }

  reject(reject, message?) {
    const options = {
      type: 'error',
      title: 'ERROR',
      text: message || 'There is no message'
    };
    swal(options).then(() => {
      this.router.navigate(['/messages']);
      reject();
    })
  }
}
