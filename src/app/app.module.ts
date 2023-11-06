import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { UsersComponent } from './components/users/users.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { HttpClientModule } from '@angular/common/http';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { MatSelectModule } from '@angular/material/select';
import { AngularMaterialModule } from './utils/angular-material.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    UsersComponent,
    CreateUserComponent,
    EditUserComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    NgbModule,
    HttpClientModule,
    MatSelectModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
