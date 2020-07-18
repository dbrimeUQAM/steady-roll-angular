import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { OrderService } from '../../../services/order/order.service';
import { Order } from '../../../services/order/order';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-orders-list',
  templateUrl: './admin-orders-list.component.html',
  styleUrls: ['./admin-orders-list.component.css']
})
export class AdminOrdersListComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  orders: Order[] = [];
  columnsToDisplay: string[] = ['orderDate', 'status', 'hospitalName', 'userName', 'qty', 'actions'];
  dataSource: MatTableDataSource<Order>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  isLoadingResults = true;
  durationInSeconds = 5;

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
      this.snackBar.openFromComponent(PizzaPartyDeleteOrderComponent, {
        duration: this.durationInSeconds * 1000,
        horizontalPosition: 'center' ,
        verticalPosition: 'top',
      });
      this.ngOnInit();
    });
  }

  cancelOrder(orderId: string) {
    this.orderService.cancelOrder(orderId).subscribe(data => {
      this.snackBar.openFromComponent(PizzaPartyCancelOrderComponent, {
        duration: this.durationInSeconds * 1000,
        horizontalPosition: 'center' ,
        verticalPosition: 'top',
      });
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

}

@Component({
  selector: 'app-snack-bar-delete-order',
  templateUrl: '../../../snack-bar-messages/snack-bar-deleted.html',
})
export class PizzaPartyDeleteOrderComponent {}

@Component({
  selector: 'app-snack-bar-cancel-order',
  templateUrl: '../../../snack-bar-messages/snack-bar-cancelled.html',
})
export class PizzaPartyCancelOrderComponent {}
