import { AuthService } from './../../services/auth/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


// country: "TR"
// dateOfBirth: "1971-06-28"
// firstName: "Elon"
// identityNumber: "12345678901"
// lastName: "Musk"
// phoneNumber: "+905320000001"
// updateDate: "2021-12-05T05:42:07.340394Z"

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
    //Filter only numbers from the input
    let cleaned = ('' + str).replace(/\D/g, '');
    
    //Check if the input is of correct length
    let match = cleaned.match(/^(\+{1})(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})$/);
  
    if (match) {
      return match[1] + '' + match[2] + '-' + match[3] + match[4] + match[5]
    };
  
    return null
  };

}
