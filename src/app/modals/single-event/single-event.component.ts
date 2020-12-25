import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-single-event',
  templateUrl: './single-event.component.html',
})
export class SingleEventComponent implements OnInit {
  event: any = {};
  loggedIn: boolean = false;
  constructor(
    private bsModalRef: BsModalRef
  ) { }

  ngOnInit() {}

  close() {
    this.bsModalRef.hide();
  }

}
