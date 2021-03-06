import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HospitalService } from '../../../services/hospital/hospital.service';
import { Hospital } from '../../../services/hospital/hospital';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-hospitals-list',
  templateUrl: './admin-hospitals-list.component.html',
  styleUrls: ['./admin-hospitals-list.component.css']
})
export class AdminHospitalsListComponent implements OnInit {
  private configSuccess: MatSnackBarConfig = {
    panelClass: ['style-success'],
    duration: 4000,
    horizontalPosition: 'center' ,
    verticalPosition: 'top'
  };
  hospitals: Hospital[] = [];
  columnsToDisplay: string[] = ['name', 'phone', 'city', 'province', 'actions'];
  dataSource: MatTableDataSource<Hospital>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  isLoadingResults = true;

  constructor(private snackBar: MatSnackBar,
              private hospitalService: HospitalService) { }

  ngOnInit(): void {

    this.hospitalService.getAll()
    .subscribe((res: any) => {
      this.hospitals = res;
      this.isLoadingResults = false;
      this.dataSource = new MatTableDataSource(this.hospitals);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });

  }

  deleteHospital(hospitalId: string) {
    this.hospitalService.deleteHospital(hospitalId).subscribe(data => {
      this.openSnackBarSuccess('Supprimé');
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
