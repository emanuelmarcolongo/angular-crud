import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  MinLengthValidator,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from 'src/app/service/users.service';
import { UserDTO } from 'src/app/types/user.DTO';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {
  addUserForm!: FormGroup;
  user!: any;
  users!: any;
  userTypes: any = ['Administrador', 'Usuário'];
  jobOptions: any = [
    'Front-end Developer',
    'Back-end Developer',
    'QA Analyst',
    'Scrum Master',
    'Fullstack Developer',
  ];
  constructor(
    public dialogRef: MatDialogRef<CreateUserComponent>,
    public userService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
    this.buildAddUserForm();
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
    });
  }

  addUser() {
    const userInfo: UserDTO = this.addUserForm.value;

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
