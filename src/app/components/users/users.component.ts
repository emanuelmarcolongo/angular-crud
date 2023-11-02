import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';
import { UsersService } from 'src/app/service/users.service';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { TeamService } from 'src/app/service/team/team.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  @Input() public user?: any;
  @Input() public users?: any;
  teams!: any;

  constructor(
    private dialog: MatDialog,
    private userService: UsersService,
    teamService: TeamService
  ) {
    teamService.getTeams().subscribe((teams) => {
      this.teams = teams;
    });
  }

  openDialogCreateUser(user?: any) {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      data: user,
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
    if (window.confirm('Tem certeza que deseja excluir o usuário?')) {
      this.userService.deleteUser(id).subscribe((user: any) => {
        this.userService.getUsers().subscribe((users: any) => {
          this.users = users;
        });
      });
    }
  }
}
