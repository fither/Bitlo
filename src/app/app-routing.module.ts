import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { ProfileComponent } from './views/profile/profile.component';
import { MarketsComponent } from './views/markets/markets.component';
import { MarketComponent } from './views/market/market.component';
import { BalancesComponent } from './views/profile/balances/balances.component';
import { OpenOrdersComponent } from './views/profile/open-orders/open-orders.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/balances', component: BalancesComponent },
  { path: 'profile/open-orders', component: OpenOrdersComponent },
  { path: 'markets', component: MarketsComponent },
  { path: 'market/:id', component: MarketComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
