import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, HttpClientModule,
  ],
  declarations: [HomeComponent, LoginComponent]
})
export class HomeModule { }
