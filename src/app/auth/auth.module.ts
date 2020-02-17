import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrarionComponent } from './registrarion/registrarion.component';



@NgModule({
  declarations: [LoginComponent, RegistrarionComponent],
  exports: [
    LoginComponent,
    RegistrarionComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
