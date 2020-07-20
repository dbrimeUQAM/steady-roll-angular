import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { OrderService } from '../../../services/order/order.service';
import { Order } from '../../../services/order/order';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-orders-list',
  templateUrl: './admin-orders-list.component.html',
  styleUrls: ['./admin-orders-list.component.css']
})
export class AdminOrdersListComponent implements OnInit {

  private configSuccess: MatSnackBarConfig = {
    panelClass: ['style-success'],
    duration: 4000,
    horizontalPosition: 'center' ,
    verticalPosition: 'top'
  };
  orders: Order[] = [];
  columnsToDisplay: string[] = ['orderDate', 'status', 'hospitalName', 'userName', 'qty', 'actions'];
  dataSource: MatTableDataSource<Order>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  isLoadingResults = true;

  constructor(private snackBar: MatSnackBar,
              private orderService: OrderService) { }

  ngOnInit(): void {

    this.orderService.getAll()
    .subscribe((res: any) => {
      this.orders = res;
      this.isLoadingResults = false;
      this.dataSource = new MatTableDataSource(this.orders);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });

  }

  deleteOrder(orderId: string) {
    this.orderService.deleteOrder(orderId).subscribe(data => {
      this.openSnackBarSuccess('Supprimé');
      this.ngOnInit();
    });
  }

  cancelOrder(orderId: string) {
    this.orderService.cancelOrder(orderId).subscribe(data => {
      this.openSnackBarSuccess('Annulée');
      this.ngOnInit();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openSnackBarSuccess(message: string) {
    this.snackBar.open(message, 'fermer', this.configSuccess);
  }

}


