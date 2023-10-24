import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {
  addUserForm!: FormGroup;
  user!: any;
  constructor(
    public dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    
  ) { 
    console.log(data)
    this.buildAddUserForm();
  }



  buildAddUserForm() {
    this.addUserForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(60)]),
      job: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      birthdate: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
      phone: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(11)]),
     zipcode: new FormControl(null, [Validators.required]),
     street: new FormControl(null, [Validators.required]),
     number: new FormControl(null, [Validators.required]),
     complement: new FormControl(null, [Validators.required]),
     neighborhood: new FormControl(null, [Validators.required]),
     city: new FormControl(null, [Validators.required]),
     state: new FormControl(null, [Validators.required]),
    })
  }

 
  addUser() {

    console.log(this.addUserForm);
    
    this.user = {name: this.addUserForm.value.name,
      job: this.addUserForm.value.job,
      birthdate: this.addUserForm.value.birthdate,
      email: this.addUserForm.value.email,
      password: this.addUserForm.value.password,
      phone: this.addUserForm.value.phone,
      adress: {
        zipcode: this.addUserForm.value.zipcode,
        street: this.addUserForm.value.street,
        number: this.addUserForm.value.number,
        complement: this.addUserForm.value.complement,
        neighborhood: this.addUserForm.value.neighborhood,
        city: this.addUserForm.value.city,
        state: this.addUserForm.value.state
      }
    }
    console.log(this.user);
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
        return 'Precisa ser maior que 30 caracteres'
      default:
        return '';
  }}
}