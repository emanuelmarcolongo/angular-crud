import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-crud';
  user?: any;
  users?: any[];

  createUser: any = {
    name: 'Emanuel',
    job: 'Dev',
    birthDate: '1997-02-11T00:00:00.000Z',
    email: 'manu@teste.com',
    password: '123',
    phone: '22-998669093',
    adress: {
      street: 'jabuti',
      number: 200,
      state: 'RJ',
      city: 'Cabo Frio',
      neighborhood: 'centro',
      zipCode: '22222-22',
    },
  };

  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('Users') || '[]');

    const authenticatedUser = JSON.parse(
      localStorage.getItem('User') || 'null'
    );

    if (authenticatedUser) {
      this.user = authenticatedUser;
    }

    const isUserRegistered = this.users?.some(
      (user) => user.email === authenticatedUser.email
    );

    if (!isUserRegistered) {
      this.users?.push(this.createUser);
      localStorage.setItem('Users', JSON.stringify(this.users));
    }
  }

  userLogin(user: any) {
    const userExists: any | undefined = this.users?.find(
      (u) => u.email === user.email && user.password === u.password
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
