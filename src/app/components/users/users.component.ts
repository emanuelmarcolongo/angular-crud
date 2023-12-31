import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';
import { UsersService } from 'src/app/service/users.service';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { TeamService } from 'src/app/service/team/team.service';
import { Team } from 'src/app/types/team.type';
import { UserEntity } from 'src/app/types/user.entity';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  @Input() public user?: UserEntity;
  @Input() public users?: UserEntity[];
  teams!: Team[];

  constructor(
    private dialog: MatDialog,
    private userService: UsersService,
    teamService: TeamService
  ) {
    teamService.getTeams().subscribe((teams) => {
      this.teams = teams;
    });
  }

  ngOnInit() {
    this.userService.getUsers().subscribe((users: any) => {
      this.users = users;
    });
  }

  openDialogEditUser(user: any) {
    const dialogRef = this.dialog.open(EditUserComponent, {
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
