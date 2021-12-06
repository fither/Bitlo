import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth/auth-service.service';

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

@Component({
  selector: 'app-open-orders',
  templateUrl: './open-orders.component.html',
  styleUrls: ['./open-orders.component.scss']
})
export class OpenOrdersComponent implements OnInit {
  openOrders: IOpenOrder[] = [];
  dataSource = new MatTableDataSource<IOpenOrder>(this.openOrders);

  formatter = new Intl.NumberFormat('tr-TR');
  formatterTRY = new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY'
  });

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  displayedColumns: string[] = [
    'marketCode',
    'orderSide',
    'orderDate',
    'price',
    'orderAmount',
    'fillAmount',
    'fillPercent'
  ]

  constructor(
    private _authService: AuthService
  ) { }

  async ngOnInit(): Promise<void> {
    await this._authService.getOpenOrders();

    this.openOrders = this._authService.openOrders;
    this.dataSource = new MatTableDataSource<IOpenOrder>(this.openOrders);
    this.dataSource.paginator = this.paginator;
  }

  calculateFillPercent(fillAmount: number, orderAmount: number) {
    return Math.round((fillAmount / orderAmount) * 100 * 100) / 100;
  }

  formatDate(date: Date) {
    return new Date(date).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
}
