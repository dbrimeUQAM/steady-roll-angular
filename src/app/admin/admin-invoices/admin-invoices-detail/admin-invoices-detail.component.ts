import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from '../../../services/invoice/invoice.service';
import { Router } from '@angular/router';
import { Invoice } from '../../../services/invoice/invoice';
import { Article } from '../../../services/article/article';
import { TokenStorageService } from '../../../services/token-storage/token-storage.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-invoices-detail',
  templateUrl: './admin-invoices-detail.component.html',
  styleUrls: ['./admin-invoices-detail.component.css']
})
export class AdminInvoicesDetailComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 5;

  articles: Article[] = [];
  columnsToDisplay: string[] = ['articleType', 'name', 'description', 'hospitalName', 'qty'];
  dataSource: MatTableDataSource<Article>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  invoice: Invoice = new Invoice();
  isSuccessful = false;
  isSaveFailed = false;
  errorMessage = '';

  constructor(private snackBar: MatSnackBar,
              private router: Router,
              private invoiceService: InvoiceService,
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


    this.invoiceService.getInvoiceById(this.route.snapshot.params.id)
    .subscribe((res: any) => {
      this.invoice = res;
      console.log(res.articles);
      this.articles = res.articles;
      this.dataSource = new MatTableDataSource(this.articles);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
    });

  }

  deleteInvoice() {
    this.invoiceService.deleteInvoice(this.invoice._id).subscribe(data => {
      this.router.navigate(['/admin/admin-invoices']);
    });
  }

}

