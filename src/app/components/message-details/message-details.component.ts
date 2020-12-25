import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

import { UserService } from './../../services/user.service';
import { StaticDataService } from './../../services/static-data.service';
import { MessageService } from './../../services/message.service';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
})
export class MessageDetailsComponent implements OnInit {
  profile: any;
  message:any;
  events: any;
  newComment: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private staticDataService: StaticDataService,
    private messageService: MessageService,
  ) {
    this.profile = this.userService.getCurrentUser();
    this.message = {};
    this.events = this.staticDataService.messageEvents;
    this.newComment = { content: '' };
  }

  ngOnInit() {
    this.message.messageId = this.route.snapshot.paramMap.get('id');
    this.route.data.subscribe((data) => {
      const { message, comments } = data;
      let childComments = [];
      if (comments.rows && comments.rows.length) {
        childComments = _(comments.rows).remove((cmt) => {
          return cmt.parentId;
        }).groupBy('parentId').value();
        _.forEach(comments.rows, function(cmt) {
          cmt.children = childComments[cmt.id] || [];
        });
        message.comments = _.sortBy(comments.rows, 'createdAt');
      } else {
        message.comments = [];
      }
      this.message = message;
      this.message.messageId = this.route.snapshot.paramMap.get('id');
    });
  }

  addComment() {
    const params = { content: this.newComment.content };
    this.messageService.comment(params, this.message.messageId).subscribe((comment) => {
      this.newComment.content = '';
      comment.createdBy = this.profile;
      this.message.comments.push(comment);
    });
  }

  closeMessage() {
    const params = { status: 'closed' };
    this.messageService.update(params, this.message.messageId).subscribe(() => {
      this.router.navigate(['/messages'])
    })
  }

}
