import { Component, OnInit } from '@angular/core';
import { UsersService } from './service/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-crud';
  user?: any;
  users?: any[];

  constructor(private userService: UsersService) {
    this.userService.getUsers().subscribe((users: any) => {
      this.users = users;
    });
  }

  ngOnInit(): void {
    const authenticatedUser = JSON.parse(
      localStorage.getItem('User') || 'null'
    );

    if (authenticatedUser) {
      this.user = authenticatedUser;
    }
  }
}
