import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-place-of-birth',
  templateUrl: './place-of-birth.component.html',
})
export class PlaceOfBirthComponent implements OnInit {
  @Input() model?: string;
  @Output() onChange:EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  modelChange(e) {
    this.onChange.emit(e);
  }

  ngOnInit() {
  }

}
