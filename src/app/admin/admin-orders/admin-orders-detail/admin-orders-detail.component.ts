import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order/order.service';
import { Router } from '@angular/router';
import { Order } from '../../../services/order/order';
import { Article } from '../../../services/article/article';
import { TokenStorageService } from '../../../services/token-storage/token-storage.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-orders-detail',
  templateUrl: './admin-orders-detail.component.html',
  styleUrls: ['./admin-orders-detail.component.css']
})
export class AdminOrdersDetailComponent implements OnInit {

  private configSuccess: MatSnackBarConfig = {
    panelClass: ['style-success'],
    duration: 4000,
    horizontalPosition: 'center' ,
    verticalPosition: 'top'
  };

  articles: Article[] = [];
  columnsToDisplay: string[] = ['articleType', 'name', 'description', 'hospitalName', 'qty'];
  dataSource: MatTableDataSource<Article>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  order: Order = new Order();
  isSuccessful = false;
  isSaveFailed = false;
  errorMessage = '';

  statusList: string[] = ['En cours', 'Payée', 'En préparation', 'Expediée', 'Livrée', 'Annulé'];

  constructor(private snackBar: MatSnackBar,
              private router: Router,
              private orderService: OrderService,
              private tokenStorage: TokenStorageService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    if (this.tokenStorage.getToken()) {
      if (this.tokenStorage.getUser().role !== 'admin') {
        this.router.navigate(['/home']);
      }
    } else {
      this.router.navigate(['/home']);
    }


    this.orderService.getOrderById(this.route.snapshot.params.id)
    .subscribe((res: any) => {
      this.order = res;
      console.log(res.articles);
      this.articles = res.articles;
      this.dataSource = new MatTableDataSource(this.articles);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
    });

  }

  deleteOrder() {
    this.orderService.deleteOrder(this.order._id).subscribe(data => {
      this.router.navigate(['/admin/admin-orders']);
    });
  }

  cancelOrder() {
    this.orderService.cancelOrder(this.order._id).subscribe(data => {
      this.router.navigate(['/admin/admin-orders']);
    });
  }

  onSubmit() {
    if (this.order) {
      if (this.order._id) {
        this.orderService.updateOrder(this.order._id, this.order).subscribe(data => {
          this.isSuccessful = true;
          this.isSaveFailed = false;
          this.openSnackBarSuccess('Commande mis à jour!');
          this.router.navigate(['/admin/admin-orders']);
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSaveFailed = true;
        });
      }
    }
  }

  openSnackBarSuccess(message: string) {
    this.snackBar.open(message, 'fermer', this.configSuccess);
  }

}
