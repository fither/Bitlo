import { StorageService } from './services/storage/storage.service';
import { AuthService } from './services/auth/auth-service.service';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bitlo';

  constructor(
    private _authService: AuthService,
    private _storageService: StorageService
  ) {}

  async ngOnInit(): Promise<void> {
    
    // init axios
    axios.defaults.baseURL = 'https://akademi-cp.bitlo.com/api/interview';
    
    // if token exist make it logged in
    const token = this._storageService.getToken();
    if(!token) return;
    
    this._authService.setTokenOnAxios(token);
    this._authService.isLogged = true;
  }
}
