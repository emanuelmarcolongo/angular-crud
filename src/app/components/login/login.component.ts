import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/service/users.service';

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

  constructor(private userService: UsersService) {
    this.userService.getUsers().subscribe((users: any) => {
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

    const userExists: any | undefined = this.users?.find(
      (u: any) =>
        u.email === this.user.email && this.user.password === u.password
    );

    if (userExists) {
      console.log('Usuário autenticado!', userExists);
      this.user = userExists;
      localStorage.setItem('User', JSON.stringify(this.user));
    } else {
      console.log('Usuário não autenticado!');
    }
  }
}
