import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';
import { UsersService } from 'src/app/service/users.service';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  @Input() public user?: any;
  @Input() public users?: any;

  constructor(private dialog: MatDialog, private userService: UsersService) {}

  openDialogCreateUser() {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      data: this.user,
      disableClose: true,
      width: '80%',
    });

    dialogRef.afterClosed().subscribe((devolutivaModal: any) => {
      if (devolutivaModal) {
        console.log('devolutiva MOdal', devolutivaModal);
      }

      this.userService.getUsers().subscribe((users: any) => {
        this.users = users;
      });
    });
  }

  openDialogEditUser(id: number) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: { id },
      disableClose: true,
      width: '80%',
    });

    dialogRef.afterClosed().subscribe((devolutivaModal: any) => {
      if (devolutivaModal) {
        console.log('devolutiva MOdal', devolutivaModal);
      }
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe((user: any) => {
      console.log(user.nome, `deletado com sucesso!`);
    });

    this.userService.getUsers().subscribe((users: any) => {
      this.users = users;
    });
  }
}
