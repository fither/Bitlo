import { Component, OnInit, ViewChild } from '@angular/core';
import { IMarket, MarketsService } from 'src/app/services/market/markets.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export class InfoClass {
  change24hPercent: number = 0;
  mostChange24hPercent = {
    change24hPercent: 0,
    marketCode: ''
  };
  leastChange24hPercent = {
    change24hPercent: 0,
    marketCode: ''
  };
  currentQuoteHigherThan10k: number = 0;
  currentQuoteLesserThan1: number = 0;
  averageCurrentQuote: number = 0;
  equality: number = 0;
}

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.scss']
})
export class MarketsComponent implements OnInit {
  markets: IMarket[] = [];
  keyword: string = '';
  dataSource = new MatTableDataSource<IMarket>(this.markets);

  infos: InfoClass = new InfoClass();

  formatter = new Intl.NumberFormat('tr-TR');

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  displayedColumns: string[] = [
    'no',
    'marketCode',
    'currentQuote',
    'change24h',
    'change24hPercent',
    'highestQuote24h',
    'lowestQuote24h'
  ]
  
  constructor(
    public _marketsServie: MarketsService
  ) { }

  async ngOnInit(): Promise<void> {
    await this._marketsServie.getMarkets();
    
    this.markets = this._marketsServie.markets;
    this.dataSource = new MatTableDataSource<IMarket>(this.markets);
    this.dataSource.paginator = this.paginator;
    
    this.dataSource.filterPredicate = function(data: IMarket, filter: string) {
      return data.marketCode.search(filter) !== -1;
    }

    this.getInfos();
  }


  getColorForPercent(percent: number) {
    return percent > 0 ? 'color-green' : percent == 0 ? 'color-black' : 'color-red';
  }

  resetInfos() {
    this.infos = new InfoClass();
  }


  getInfos() {
    this.resetInfos();

    let allCurrentQuotes: number = 0;
    let btc_try: number = 0;
    let usdt_try: number = 0;
    this.dataSource.filteredData.map((market: IMarket, index: number) => {
      const marketCurrentQuote: number = parseFloat('' + market.currentQuote);
      if(market.change24hPercent > 0) {
        this.infos.change24hPercent += 1
      }

      if(market.change24hPercent > this.infos.mostChange24hPercent.change24hPercent) {
        this.infos.mostChange24hPercent.change24hPercent = market.change24hPercent;
        this.infos.mostChange24hPercent.marketCode = market.marketCode;
      }

      if(index === 0 || market.change24hPercent < this.infos.leastChange24hPercent.change24hPercent) {
        this.infos.leastChange24hPercent.change24hPercent = market.change24hPercent;
        this.infos.leastChange24hPercent.marketCode = market.marketCode;
      }

      if(marketCurrentQuote > 10000) {
        this.infos.currentQuoteHigherThan10k += 1;
      }

      if(marketCurrentQuote < 1) {
        this.infos.currentQuoteLesserThan1 += 1;
      }

      if(market.marketCode === 'BTC-TRY') {
        btc_try = marketCurrentQuote;
      }

      if(market.marketCode === 'USDT-TRY') {
        usdt_try = marketCurrentQuote;
      }

      allCurrentQuotes += marketCurrentQuote;
    });

    this.infos.averageCurrentQuote = Math.round((allCurrentQuotes / this.markets.length) * 100) / 100;
    this.infos.equality = Math.round((btc_try / usdt_try) * 100) / 100;
  }

  search() {
    const word = this.keyword.trim();
    this.dataSource.filter = word;

    this.getInfos();
  }
}
