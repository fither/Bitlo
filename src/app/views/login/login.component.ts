import { StorageService } from './../../services/storage/storage.service';
import { IUserAuth } from '../../interfaces/userAuth';
import { AuthService } from '../../services/auth/auth-service.service';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ILoginResponse } from '../../interfaces/loginResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private _authService: AuthService,
    private _storageService: StorageService,
    private _router: Router
  ) { }

  identifier = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  passwordHide = true;
  loginError = '';

  async login() {
    this.loginError = '';
    const userAuth: IUserAuth = {
      identifier: this.identifier.value,
      password: this.password.value
    };

    await this._authService.login(userAuth)
    .then(() => {
      this._router.navigate(['/profile']);
    })
    .catch((error) => {
      if(error.response.status === 403) {
        this.loginError = 'Kullanıcı adı ya da parola yanlış';
      } else {
        this.loginError = error.response.data.message;
      }
    })
  }

  getIdentifierErrorMessage() {
    if (this.identifier.hasError('required')) {
      return 'Boş olamaz';
    }

    return this.identifier.hasError('email') ? 'Lütfen geçerli bir e-posta adresi giriniz”' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'Boş olamaz';
    } else {
      return null;
    }
  }

}
