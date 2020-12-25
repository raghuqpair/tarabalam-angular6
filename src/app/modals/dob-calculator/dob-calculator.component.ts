import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import swal from 'sweetalert';

declare const calculate:any;

@Component({
  selector: 'app-dob-calculator',
  templateUrl: './dob-calculator.component.html',
})
export class DobCalculatorComponent implements OnInit {
  dob: any;
  days: Array<string>;
  months: Array<string>;
  birthDate: any;
  constructor() {
    this.dob = {};
    const days = new Array(31);
    this.days = _.map(days, (item, idx) => idx + 1);
    this.months = ['January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const today = new Date();
    this.birthDate = {
      day: today.getDate(),
      month: this.months[today.getMonth()],
      year: today.getFullYear()
    }
  }

  ngOnInit() {
  }

  calculate(){
    var star = calculate();
    if (star) {
      swal('Your birth star: ' + star, '', 'success');
    }
  }

}
