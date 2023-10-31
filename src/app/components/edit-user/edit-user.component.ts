import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  MinLengthValidator,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent {
  editUserForm!: FormGroup;
  user!: any;
  id!: number;
  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    public userService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {
    this.id = data.id;
    this.buildEditUserForm();
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
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12),
      ]),
      salary: new FormControl(null, [Validators.required]),
    });
  }

  editUser() {
    const userInfo = {
      name: this.editUserForm.value.name,
      job: this.editUserForm.value.job,
      email: this.editUserForm.value.email,
      password: this.editUserForm.value.password,
      salary: this.editUserForm.value.salary,
      type: 'User',
    };

    this.userService.editUser(this.id, userInfo).subscribe((user: any) => {
      console.log(user.nome, `modificado com sucesso!`);
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
