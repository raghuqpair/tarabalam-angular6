import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  profile: any = {};
  constructor(
    private userService: UserService,
  ) {
    this.userService.user.subscribe((user) => {
      this.profile = user;
    });
  }

  ngOnInit() {
  }

}
