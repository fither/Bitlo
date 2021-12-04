import { StorageService } from './../storage/storage.service';
import { Injectable } from '@angular/core';
import { IUserAuth } from '../../interfaces/userAuth';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _storageService: StorageService
  ) { }

  setTokenOnAxios(token: string) {
    axios.defaults.headers.common['x-bitlo-auth'] = token
  }

  async login(user: IUserAuth) {
    await axios.post(
      'https://akademi-cp.bitlo.com/api/interview/auth/login',
      user
    ).then((response) => {
      this._storageService.setToken(response.data.token);
      this.setTokenOnAxios(response.data.token);
    });
  }

  async fetchMe() {
    const token = this._storageService.getToken();
    if(!token) return;

    const { data } = await axios.post(
      'https://akademi-cp.bitlo.com/api/interview/auth/me',
      token
    );

    return data;
  }
}
