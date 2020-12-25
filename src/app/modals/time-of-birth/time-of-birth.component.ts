import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-time-of-birth',
  templateUrl: './time-of-birth.component.html'
})
export class TimeOfBirthComponent implements OnInit {
  @Input() hour?:string;
  @Input() minute?:string;
  @Input() second?:string;
  @Input() showAddOn?:boolean;
  @Output() onChange:EventEmitter<any> = new EventEmitter<any>();
  constructor() {
    this.hour = '1';
    this.minute = '0';
    this.second = '0';
    this.showAddOn = false;
  }

  ngOnInit() {
  }

  modelChange(e) {
    const { hour, minute, second } = this;
    this.onChange.emit({ hour, minute, second });
  }

}
