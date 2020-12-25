import { Component, OnInit } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import * as _ from 'lodash';
import * as moment from 'moment';

import { UserService } from './../../services/user.service';
import { StaticDataService } from './../../services/static-data.service';
import { MessageService } from './../../services/message.service';

@Component({
  selector: 'app-message-new',
  templateUrl: './message-new.component.html',
})
export class MessageNewComponent implements OnInit {
  events: any;
  message: any;
  payment: any;
  months: Array<any>;
  years: Array<any>;
  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private staticDataService: StaticDataService,
    private messageService: MessageService,
  ) {
    this.events = this.staticDataService.messageEvents;
    this.message = { new: true };
    this.payment = {
      invalid: true,
      type: 'PAYPAL'
    };
    this.months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    this.years = _.map(new Array(10), (item, index) => {
      return moment().get('year') + index;
    });
  }

  ngOnInit() {
  }

  onEventNameChange() {
    if(this.message.type !== 'Pooja') {
      this.payment.invalid = false;
    }
  }

  create() {
    this.messageService.create(this.message).subscribe(() => {
      this.router.navigate(['messages']);
      swal('', 'Thanks for posting your message, You will recieve response within 24 hours from our expert Tarabalam team', 'success');
    })
  }

  createMessage() {
    if(this.message.type === 'Pooja') {
      if (this.payment.invalid) return false;
      const data = {
        cardnumber: this.payment.number,
        month: this.payment.month,
        year: this.payment.year,
        cvc: this.payment.cvc,
        stripeEmail: this.payment.email,
      };
      this.http.post('http://52.0.119.207:4800/pay', data).subscribe({
        next: (resp) => {
          if(resp === 'success') {
            this.create();
          } else {
            swal('ERROR', 'Your Credit Card is not correct', 'error');
          }
        },
        error: () => swal('ERROR', 'Your Credit Card is not correct', 'error'),
      })
    } else {
      this.create();
    }
  }

  paymentFormChange() {
    if (this.payment.type === 'CREDIT_CARD' && (!this.payment.email || !this.payment.number || !this.payment.month || !this.payment.year || !this.payment.cvc)) {
      this.payment.invalid = true;
    } else {
      this.payment.invalid = false;
    }
  }

}
