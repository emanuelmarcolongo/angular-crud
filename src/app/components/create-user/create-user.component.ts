import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TeamService } from 'src/app/service/team/team.service';
import { UsersService } from 'src/app/service/users.service';
import { Team } from 'src/app/types/team.type';
import { UserDTO } from 'src/app/types/user.DTO';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {
  addUserForm!: FormGroup;
  currentUser!: any;
  editUser: boolean = false;
  userTypes: any = ['Administrador', 'Usuário'];
  jobOptions: any = [
    'Tech Lead',
    'Front-end Developer',
    'Back-end Developer',
    'Fullstack Developer',
    'QA Analyst',
    'Scrum Master',
    'Product Owner',
  ];
  teams!: Team[];

  constructor(
    public userService: UsersService,
    public teamService: TeamService
  ) {
    this.buildAddUserForm();
    teamService.getTeams().subscribe((teams) => {
      this.teams = teams;
    });
  }

  buildAddUserForm() {
    this.addUserForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(60),
      ]),
      job: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      type: new FormControl(null, [Validators.required]),
      salary: new FormControl(null, [Validators.required]),
      teamId: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  addUser() {
    const userInfo: UserDTO = this.addUserForm.value;
    console.log(userInfo);

    this.userService.insertUser(userInfo).subscribe((user: any) => {
      console.log(user.nome, `inserido com sucesso!`);
    });
  }

  getErrorMessage(controlName: string) {
    switch (controlName) {
      case 'email':
        return 'Formato de Email inválido!';
      case 'required':
        return 'Campo Obrigatório';
      case 'minLenght':
        return 'Precisa ser maior que 2 caracteres';
      case 'manLenght':
        return 'Precisa ser maior que 30 caracteres';
      default:
        return '';
    }
  }
}
