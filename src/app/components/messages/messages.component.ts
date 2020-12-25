import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

import { UserService } from './../../services/user.service';
import { StaticDataService } from './../../services/static-data.service';
import { MessageService } from './../../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
})
export class MessagesComponent implements OnInit {
  profile: any;
  astrologers: any;
  currentPage: number;
  pages: Array<any>;
  tableSize: number;
  messages: Array<any>;
  messageCount: number;
  unreadCount: number;
  loading: boolean;
  showClosed: boolean;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private staticDataService: StaticDataService,
    private messageService: MessageService,
  ) {
    this.profile = this.userService.getCurrentUser();
    this.astrologers = [];
    this.currentPage = 0;
    this.messages = [];
    this.messageCount = 0;
    this.loading = false;
    this.pages = [];
    this.unreadCount = 0;
    this.tableSize = this.staticDataService.tableSize;
    this.showClosed = false;
  }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.astrologers = data.astrologers;
    });
    this.getMessages();
    this.getUnreadMessages()
  }

  getMessages(offset?, size?) {
    const limit = size || this.tableSize;
    offset = offset || 0;
    const params = { limit, offset, status: this.showClosed ? 'closed' : 'open' };
    this.loading = true;
    this.messageService.get(params).subscribe({
      next: (data) => {
        this.loading = false;
        if(data) {
          this.messages = _.map(data.rows, (item) => {
            item.astrologerId = item.astrologerId ? String(item.astrologerId) : item.astrologerId;
            return item;
          });
          this.messageCount = data.count;
          this.pages =  _.range(Math.ceil(data.count / limit));
        }
      },
      error: () => {
        this.loading = false;
        this.messages = [];
        this.messageCount = 0;
      }
    })
  }

  getUnreadMessages() {
    this.messageService.getUnread().subscribe((data) => this.unreadCount = data.unreadCount);
  }

  updateMessage(params, id) {
    this.messageService.update(params, id)
  }

  changeMessageStatus(message) {
    message.status = message.status == 'closed' ? 'open' : 'closed';
    this.updateMessage({ status: message.status }, message.id);
  }

  changePage(page) {
    this.currentPage = page;
    const offset = this.tableSize * page;
    this.getMessages(offset, this.tableSize);
  }

  toggleStatus() {
    this.showClosed = !this.showClosed;
    const offset = this.tableSize * this.currentPage;
    this.getMessages(offset, this.tableSize);
  }

}
