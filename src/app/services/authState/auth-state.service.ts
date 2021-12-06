import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StateService } from '../state/state.service';
import { StorageService } from '../storage/storage.service';
import { AuthApiService } from './api/auth-api.service';

export interface IUserAuth {
  identifier: string;
  password: string;
}

export interface ILoginResponse {
  code: number;
  message: string;
  token: string;
}

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

export interface IBalance {
  assetCode: string
  availableAmount: number
  availableAmountTRYValue: number
}

export interface IBalanceResponse {
  code: number;
  message: string;
  balances: IBalance[]
}

export interface IOpenOrder {
  marketCode: string;
  orderSide: string;
  orderDate: Date,
  price: number;
  orderAmount: number;
  fillAmount: number;
}

export interface IOpenOrderResponse {
  code: number;
  message: string;
  openOrders: IOpenOrder[]
}

interface AuthState {
  isLogged: boolean;
  me: IMe;
  balances: IBalance[],
  openOrders: IOpenOrder[]
}

const initialState: AuthState = {
  isLogged: false,
  me: {
    country: '',
    dateOfBirth: new Date,
    firstName: '',
    identityNumber: 0,
    lastName: '',
    phoneNumber: '',
    updateDate: new Date
  },
  balances: [],
  openOrders: []
}

@Injectable({
  providedIn: 'root'
})
export class AuthStateService extends StateService<AuthState> {
  balances$: Observable<IBalance[]> = this.select(state => state.balances);
  openOrders$: Observable<IOpenOrder[]> = this.select(state => state.openOrders);
  me$: Observable<IMe> = this.select(state => state.me);
  isLogged$: Observable<boolean> = this.select(state => state.isLogged);

  constructor(
    private storageService: StorageService,
    private router: Router,
    private authApiService: AuthApiService
  ) {
    super(initialState);
  }

  getOpenOrders() {
    this.authApiService.getOpenOrders().subscribe((response: IOpenOrderResponse) => {
      this.setState({ openOrders: response.openOrders });
    })
  }

  getBalances() {
    this.authApiService.getBalances().subscribe((response: IBalanceResponse) => {
      this.setState({ balances: response.balances });
    })
  }
  
  getMe() {
    this.authApiService.getMe().subscribe((response: IMeResponse) => {
      this.setState({ me: response.me });
    })
  }

  login(user: IUserAuth) {
    this.authApiService.login(user).subscribe((response: ILoginResponse) => {
      this.storageService.setToken(response.token);
      this.setState({ isLogged: true });
    })
  }

  setTokenHeader() {
    
  }

  removeTokenHeader() {
    
  }

  logout() {
    this.storageService.removeToken();
    this.router.navigate(['/login']);
    this.setState({ isLogged: false});
  }
}
