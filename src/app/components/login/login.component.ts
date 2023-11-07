import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/service/users.service';
import { UserEntity } from 'src/app/types/user.entity';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Output() loginEmitter = new EventEmitter<any>();
  users: any;
  user: any;
  loginForm!: FormGroup;

  constructor(private userService: UsersService, private router: Router) {
    this.userService.getUsers().subscribe((users: UserEntity) => {
      this.users = users;
    });

    this.buildLoginForm();
  }

  ngOnInit(): void {
    const authenticatedUser = JSON.parse(
      localStorage.getItem('User') || 'null'
    );

    if (authenticatedUser) {
      this.user = authenticatedUser;
      this.router.navigate(['/users']);
    }
  }

  buildLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  userLogin() {
    this.user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    const authenticatedUser: UserEntity | undefined = this.users?.find(
      (u: UserEntity) =>
        u.email === this.user.email && this.user.password === u.password
    );

    if (authenticatedUser) {
      console.log('Usuário autenticado!', authenticatedUser);
      this.user = authenticatedUser;
      localStorage.setItem('User', JSON.stringify(this.user));
      this.router.navigate(['/users']);
    } else {
      console.log('Usuário não autenticado!');
    }
  }
}
