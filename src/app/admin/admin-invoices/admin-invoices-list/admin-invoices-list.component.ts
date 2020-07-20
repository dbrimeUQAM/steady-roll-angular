import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { InvoiceService } from '../../../services/invoice/invoice.service';
import { Invoice } from '../../../services/invoice/invoice';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-invoices-list',
  templateUrl: './admin-invoices-list.component.html',
  styleUrls: ['./admin-invoices-list.component.css']
})
export class AdminInvoicesListComponent implements OnInit {

  private configSuccess: MatSnackBarConfig = {
    panelClass: ['style-success'],
    duration: 4000,
    horizontalPosition: 'center' ,
    verticalPosition: 'top'
  };


  invoices: Invoice[] = [];
  columnsToDisplay: string[] = ['invoiceDate', 'status', 'hospitalName', 'userName', 'total', 'actions'];
  dataSource: MatTableDataSource<Invoice>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  isLoadingResults = true;

  constructor(private snackBar: MatSnackBar,
              private invoiceService: InvoiceService) { }

  ngOnInit(): void {

    this.invoiceService.getAll()
    .subscribe((res: any) => {
      this.invoices = res;
      this.isLoadingResults = false;
      this.dataSource = new MatTableDataSource(this.invoices);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });

  }

  deleteInvoice(invoiceId: string) {
    this.invoiceService.deleteInvoice(invoiceId).subscribe(data => {
      this.openSnackBarSuccess('Supprimé');
      this.ngOnInit();
    });
  }

  setPaid(invoiceId: string) {
    this.invoiceService.setPaid(invoiceId).subscribe(data => {
      this.openSnackBarSuccess('Facture marquée payée');
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



