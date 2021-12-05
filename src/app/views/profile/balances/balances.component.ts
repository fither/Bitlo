import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth/auth-service.service';

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

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.scss']
})
export class BalancesComponent implements OnInit {
  balances: IBalance[] = [];
  dataSource = new MatTableDataSource<IBalance>(this.balances);
  hideLowBalances: boolean = true;

  formatter = new Intl.NumberFormat('tr-TR');
  formatterTRY = new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY'
  })

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  displayedColumns: string[] = [
    'logo',
    'assetCode',
    'availableAmount',
    'availableAmountTRYValue'
  ]

  constructor(
    private _authService: AuthService
  ) { }

  async ngOnInit(): Promise<void> {
    await this._authService.getBalances();

    this.balances = this._authService.balances;
    this.dataSource = new MatTableDataSource<IBalance>(this.balances);
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = function(data: IBalance, filter: string) {
      return filter === 'true' ? data.availableAmountTRYValue > 1 : true
    }
    this.toggleShowBalances();
  }

  toggleShowBalances() {
    if(this.hideLowBalances) {
      this.dataSource.filter = 'true';
    } else {
      this.dataSource.filter = 'false';
    }
  }

  getLogo(assetCode: string) {
    return `https://static.bitlo.com/cryptologossvg/${assetCode.split('-')[0].toLowerCase()}.svg`
  }

}
