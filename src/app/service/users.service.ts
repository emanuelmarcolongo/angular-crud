import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  getUsers() {
    return [
      {
        id: 1,
        nome: 'Emanuel Marcolongo',
        email: 'email@123.com',
        type: 'ADMIN',
        password: '123',
        job: 'Developer',
        salary: '50000',
      },
      {
        id: 2,
        nome: 'Ana Silva',
        email: 'ana@email.com',
        type: 'USER',
        password: '456',
        job: 'Designer',
        salary: '45000',
      },
      {
        id: 3,
        nome: 'Carlos Mendes',
        email: 'carlos@email.com',
        type: 'USER',
        password: '789',
        job: 'Project Manager',
        salary: '60000',
      },
      {
        id: 4,
        nome: 'Maria Souza',
        email: 'maria@email.com',
        type: 'USER',
        password: '101112',
        job: 'QA Engineer',
        salary: '48000',
      },
    ];
  }
}
