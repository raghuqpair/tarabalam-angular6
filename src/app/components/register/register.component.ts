import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StaticDataService } from './../../services/static-data.service';
import * as moment from 'moment';
import swal from 'sweetalert';

import { UserService } from './../../services/user.service';

declare var grecaptcha: any;
declare var calculate: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  @ViewChild('recaptcha') recaptcha: ElementRef;
  user:any;
  tob: any;
  dob: any;
  human:boolean;
  datepickerConfig:any;
  maxDate:any;
  maxTime:any;
  constructor(
    private staticData: StaticDataService,
    private userService: UserService
  ) {
    this.maxDate = new Date();
    this.user = {};
    this.tob = {
      hour: '',
      minute: '',
      second: 0,
    };
    this.dob = {
      day: '',
      month: '',
      year: '',
    };
    this.human = false;
    this.user.dob =  new FormControl('')
  }

  ngOnInit() {
  }

  placeOfBirthChange(e) {
    this.user.placeOfBirth = e;
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

  datePickerChange(e) {
    if(e) {
      const date = moment(e.value);
      const [ day, month, year ] = [ date.date(), date.month(), date.year() ];
      this.user.dob = new FormControl(e.value);
      this.dob = { day, month, year };
    }
  }

  verifyRecaptchaCallback(response) {
    this.human = true;
  }

  errorRecaptchaCallback(response) {
    this.human = false;
  }

  canSubmit() {
    return this.user.firstName && this.user.lastName && this.user.email && this.dob.day && this.user.placeOfBirth && this.user.password && this.user.repassword && this.human;
  }

  register() {
    if (this.user.password.length < 8) {
      swal('ERROR', 'Password must be at least 8 characters.', 'error');
      return;
    }
    if (this.user.password != this.user.repassword) {
      swal('ERROR', 'Password and password confirm not match.', 'error');
      return;
    }
    this.user.dateOfBirth = moment(this.user.dob.value).format('YYYY-MM-DD');
    const star = calculate();
    if (star) {
      this.user.star = star;
      this.user.timeOfBirth = this.tob.hour + ':' + this.tob.minute + ':' + this.tob.second;
      this.userService.register(this.user)
      .subscribe({
        next: () => {
          swal('DONE', 'Please check email and confirm your registration', 'success');
        },
        error: () => {
          swal('ERROR', 'Email is invalid, please try again', 'error');
        }
      });
    }
  }

  ngAfterViewInit() {
    const timer = setInterval(() => {
      if(typeof grecaptcha !== 'undefined') {
        clearInterval(timer);
        grecaptcha.render(this.recaptcha.nativeElement, {
          sitekey: this.staticData.recaptchaSiteKey,
          callback: this.verifyRecaptchaCallback.bind(this),
          'expired-callback': this.errorRecaptchaCallback.bind(this),
          'error-callback': this.errorRecaptchaCallback.bind(this)
        });
      }
    }, 100)
  }
}
