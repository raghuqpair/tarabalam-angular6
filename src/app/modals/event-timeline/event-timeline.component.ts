import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event-timeline',
  templateUrl: './event-timeline.component.html',
})
export class EventTimelineComponent implements OnInit {
  @Input('event') event: any;
  @Input('loggedIn') loggedIn?: any;
  constructor() { }

  ngOnInit() {}

}
