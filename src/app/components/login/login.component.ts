import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor() {
    this.buildLoginForm();
  }

  buildLoginForm() {
    this.loginForm = new FormGroup({
     email: new FormControl(null, [Validators.required, Validators.email]),
     password: new FormControl(null, [Validators.required])
    })
  }

  login() {
    this.user = {email: this.loginForm.value.email, password: this.loginForm.value.password }
    this.loginEmitter.emit(this.user);
    console.log(this.loginForm.value)
  }
}
