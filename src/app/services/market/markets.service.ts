import { Injectable } from '@angular/core';
import axios from 'axios';

export class IMarket {
  no: number = 0;
  marketCode: string = '';
  currentQuote: number = 0;
  change24h: number = 0;
  change24hPercent: number = 0;
  highestQuote24h: number = 0;
  lowestQuote24h: number = 0;
}

@Injectable({
  providedIn: 'root'
})
export class MarketsService  {
  markets: IMarket[] = [];

  constructor() { }

  async getMarkets() {
    await axios.get('/markets')
    .then((response) => {
      response.data.map((d: IMarket, index: number) => {
        Object.assign(d, {
          no: index + 1
        })
      })
      this.markets = response.data;
    });
  }
}
