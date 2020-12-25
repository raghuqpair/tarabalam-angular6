import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';

import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  token: string;
  newPassword: string;
  rePassword: string;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.newPassword = '';
    this.rePassword = '';
  }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
  }

  resetPassword() {
    if (this.newPassword != this.rePassword) {
      return swal('ERROR', 'Password and password confirm not match.', 'error');
    }

    const data = { password: this.newPassword };

    this.userService.resetPassword(data, this.token).subscribe({
      next: (done) => {
        const options = {
          type: 'success',
          title: 'DONE',
          text: done.message
        };
        swal(options).then(() => this.userService.logout());
      },
      error: (error) => {
        const options = {
          type: 'error',
          tittle: 'ERROR',
          text: error.error.message
        };
        swal(options).then(() => this.userService.logout());
      }
    });
  }

}
