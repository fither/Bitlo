import { StorageService } from './../storage/storage.service';
import { Injectable } from '@angular/core';
import { IUserAuth } from '../../interfaces/userAuth';
import axios from 'axios';
import { Router } from '@angular/router';
import { IMe, IMeResponse } from 'src/app/views/profile/profile.component';
import { ILoginResponse } from 'src/app/interfaces/loginResponse';
import { IBalance, IBalanceResponse } from 'src/app/views/profile/balances/balances.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogged: boolean = false;
  me: IMe | null = null;
  balances: IBalance[] = [];

  constructor(
    private _storageService: StorageService,
    private _router: Router
  ) { }

  setTokenOnAxios(token: string) {
    axios.defaults.headers.common['x-bitlo-auth'] = token
  }

  removeTokenOnAxios() {
    axios.defaults.headers.common['x-bittlo-auth'] = '';
  }

  async getBalances() {
    const token = this._storageService.getToken();
    if(!token) return;

    const response = await axios.post('/auth/balances');

    const data: IBalanceResponse = response.data;
    this.balances = data.balances;
  }

  async login(user: IUserAuth) {
    await axios.post(
      '/auth/login',
      user
    ).then((response) => {
      const data: ILoginResponse = response.data;

      this._storageService.setToken(data.token);
      this.setTokenOnAxios(data.token);
      this.isLogged = true;
    });
  }

  logout() {
    this._storageService.removeToken();
    this.removeTokenOnAxios();
    this.isLogged = false;
    this._router.navigate(['/login']);
  }

  async fetchMe() {
    const token = this._storageService.getToken();
    if(!token) return;

    const response = await axios.post('/auth/me');

    const data: IMeResponse = response.data;
    this.me = data.me;
  }
}
