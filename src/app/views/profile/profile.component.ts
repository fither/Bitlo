import { AuthService } from './../../services/auth/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface IMe {
  firstName: string;
  lastName: string;
  country: string;
  identityNumber: number;
  phoneNumber: string;
  dateOfBirth: Date;
  updateDate: Date;
}

export interface IMeResponse {
  code: number;
  me: IMe;
  message: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  displayedColumns: string[] = [
    'country',
    'dateOfBirth',
    'firstName',
    'lastname',
    'identityNumber',
    'phoneNumber',
    'updateDate'
  ]
  
  constructor(
    public _authService: AuthService,
    private _router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    await this._authService.fetchMe();
  }

  formatPhoneNumber (str: string) {
    //Check if the input is of correct length
    let match = str.match(/^(\+{1})(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})$/);
  
    if (match) {
      return `${match[1]}${match[2]} ${match[3]} ${match[4]} ${match[5]} ${match[6]}`;
    };
  
    return null
  };

  formatDate(date: Date) {
    return new Date(date).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

}
