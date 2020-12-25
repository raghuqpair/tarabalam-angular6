import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-birthday-star',
  templateUrl: './birthday-star.component.html',
})
export class BirthdayStarComponent implements OnInit {

  constructor(
    private bsModalRef: BsModalRef
  ) { }

  ngOnInit() {}

  close() {
    this.bsModalRef.hide();
  }

}
