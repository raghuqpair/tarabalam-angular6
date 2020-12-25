import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import * as _ from 'lodash';
import swal from 'sweetalert';

import { UserService } from './../../services/user.service';

declare var calculate:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  user: any;
  tob: any;
  dob: any;
  pw: any;
  maxDate:any;
  maxTime:any;
  constructor(
    private userService: UserService
  ) {
    this.maxDate = new Date();
    this.user = this.userService.getCurrentUser();
    const dateOfBirth = moment(this.user.dateOfBirth);
    this.user.dob = dateOfBirth.isValid() ? new FormControl(dateOfBirth.toDate()) : new FormControl('');
    this.dob = {
      day: '',
      month: '',
      year: '',
    };
    if(dateOfBirth.isValid()) {
      const [ day, month, year ] = [ dateOfBirth.date(), dateOfBirth.month(), dateOfBirth.year() ];
      this.dob = { day, month, year };
    }
    const timeOfBirth = this.user.timeOfBirth.split(':');
    const { hour , minute, second } = { hour: parseInt(timeOfBirth[0]), minute: parseInt(timeOfBirth[1]), second: parseInt(timeOfBirth[2]) };
    this.tob = {
      hour: isNaN(hour) ? '' : hour.toString(),
      minute: isNaN(minute) ? '' : minute.toString(),
      second: 0,
    };
    if(this.tob.hour && this.tob.minute) {
      this.tob.time = [hour, minute].join(':')
    }
    this.pw  = {};
  }

  ngOnInit() {
  }

  datePickerChange(e) {
    if(e) {
      const date = moment(e.value);
      const [ day, month, year ] = [ date.date(), date.month(), date.year() ];
      this.user.dob = new FormControl(e.value);
      this.dob = { day, month, year };
    }
  }

  timeOfBirthChange(e) {
    if(e) {
      const time = moment(e, 'hh:mm a');
      this.tob = {
        hour: time.format('HH'),
        minute: time.format('mm'),
        second: time.format('ss')
      };
    }
  }

  placeOfBirthChange(e) {
    this.user.placeOfBirth = e;
  }

  canSubmit() {
    return this.user.firstName && this.user.lastName && this.user.email && this.dob.day && this.user.placeOfBirth;
  }

  updateProfile() {
    this.user.dateOfBirth = moment(this.user.dob.value).format('YYYY-MM-DD');
    const star = calculate();
    if (star) {
      this.user.star = star;
      this.user.timeOfBirth = this.tob.hour + ':' + this.tob.minute + ':' + this.tob.second;
      const params = _.pick(this.user, ['firstName', 'lastName', 'star', 'dateOfBirth', 'timeOfBirth', 'placeOfBirth'])
      this.userService.update(params, this.user.id)
      .subscribe({
        next: () => {
          swal('DONE', '', 'success');
        },
        error: () => {
          swal('ERROR', 'Opps..Something went wrong', 'error');
        }
      });
    }
  }

  changePassword() {
    if (this.pw.newPassword !== this.pw.confirmPassword) {
      swal('ERROR', 'New password and confirm password are not match.', 'error');
      return;
    }
    const params = {
      password: this.pw.oldPassword,
      newPassword: this.pw.newPassword
    }
    this.userService.updatePassword(params, this.user.id).subscribe({
      next: (done) => {
        const options = {
          type: 'success',
          title: 'DONE',
          text: 'Your password have been updated.'
        };
        swal(options).then(() => this.userService.logout());
      },
      error: (error) => {
        swal('ERROR', error.error.message, 'error');
      }
    });
  }

}
