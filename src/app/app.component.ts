import { StorageService } from './services/storage/storage.service';
import { AuthService } from './services/auth/auth-service.service';
import { Component, OnInit } from '@angular/core';

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
    const token = this._storageService.getToken();
    if(!token) return;

    this._authService.setTokenOnAxios(token);
  }
}
