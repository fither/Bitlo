import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMarket, MarketsService } from 'src/app/services/market/markets.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {
  market: IMarket = new IMarket();
  formatter = new Intl.NumberFormat('tr-TR');
  marketLogo: string = '';

  constructor(
    private _router: Router,
    private _marketsService: MarketsService
  ) { }

  getColorForPercent(percent: number) {
    return percent > 0 ? 'color-green' : percent == 0 ? 'color-black' : 'color-red';
  }

  async ngOnInit(): Promise<void> {
    // TODO: find a better way to get marketCode
    const url = this._router.url;
    const marketCode = url.split('/')[url.split('/').length - 1];

    if(!this._marketsService.markets.length) {
      await this._marketsService.getMarkets();
    }

    const findedMarket = this._marketsService.markets.filter((m: IMarket) => m.marketCode === marketCode)[0];

    if(findedMarket) {
      this.market = findedMarket;
    }

    this.marketLogo = `https://static.bitlo.com/cryptologossvg/${this.market.marketCode.split('-')[0].toLowerCase()}.svg`
    
  }

}
