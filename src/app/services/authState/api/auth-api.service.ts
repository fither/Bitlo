import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOpenOrderResponse } from 'src/app/views/profile/open-orders/open-orders.component';
import { IBalanceResponse } from 'src/app/views/profile/balances/balances.component';
import { IUserAuth } from 'src/app/interfaces/userAuth';
import { ILoginResponse } from 'src/app/interfaces/loginResponse';
import { IMeResponse } from 'src/app/views/profile/profile.component';

const apiUrl: string = 'https://akademi-cp.bitlo.com/api/interview';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(
    private http: HttpClient
  ) {}

  getOpenOrders(): Observable<IOpenOrderResponse> {
    return this.http.post<IOpenOrderResponse>(apiUrl + '/auth/open-orders', {});
  }

  getBalances(): Observable<IBalanceResponse> {
    return this.http.post<IBalanceResponse>(apiUrl + '/auth/balances', {});
  }

  getMe(): Observable<IMeResponse> {
    return this.http.post<IMeResponse>(apiUrl + '/auth/me', {});
  }

  login(user: IUserAuth): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(apiUrl + '/auth/login', user);
  }
}
