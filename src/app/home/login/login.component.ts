import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email!: string;
  password!: string;
  token!: string;

  constructor(public loginService: LoginService, public router: Router) {
  }

  ngOnInit() {
    if (this.loginService.getToken()) this.router.navigate(['']);
    this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  }

  login() {
    const user = { email: this.email, password: this.password };
    this.loginService.setToken(this.token);
    this.router.navigate(['']);
    // TODO: Service login
  }

}
