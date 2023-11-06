import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
UsersComponent;

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'users', component: UsersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
