import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  MinLengthValidator,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TeamService } from 'src/app/service/team/team.service';
import { UsersService } from 'src/app/service/users.service';
import { Team } from 'src/app/types/team.type';
import { UserDTO } from 'src/app/types/user.DTO';
import { UserEntity } from 'src/app/types/user.entity';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent {
  editUserForm!: FormGroup;
  user!: UserEntity;
  id!: number;
  userTypes: string[] = ['Administrador', 'Usuário'];
  jobOptions: string[] = [
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
    public dialogRef: MatDialogRef<EditUserComponent>,
    public userService: UsersService,
    public teamService: TeamService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('data: ', data);
    this.id = data.id;
    teamService.getTeams().subscribe((teams) => {
      this.teams = teams;
    });
    this.buildEditUserForm();

    this.editUserForm.patchValue({
      password: data.password,
      name: data.name,
      job: data.job,
      email: data.email,
      type: data.type,
      salary: data.salary,
      teamId: data.teamId,
    });
  }

  buildEditUserForm() {
    this.editUserForm = new FormGroup({
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

  editUser() {
    const userInfo: UserDTO = this.editUserForm.value;

    this.userService.editUser(this.id, userInfo).subscribe((user: any) => {
      console.log(user.nome, `modificado com sucesso!`);
    });

    this.dialogRef.close();
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
