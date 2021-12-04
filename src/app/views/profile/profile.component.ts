import { AuthService } from './../../services/auth/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    const result = this._authService.fetchMe();
    console.log(result);
  }

}
