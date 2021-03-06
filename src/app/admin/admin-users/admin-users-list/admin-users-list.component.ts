import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../services/user/user';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-users-list',
  templateUrl: './admin-users-list.component.html',
  styleUrls: ['./admin-users-list.component.css']
})
export class AdminUsersListComponent implements OnInit {
  private configSuccess: MatSnackBarConfig = {
    panelClass: ['style-success'],
    duration: 4000,
    horizontalPosition: 'center' ,
    verticalPosition: 'top'
  };
  users: User[] = [];
  columnsToDisplay: string[] = ['name', 'email', 'hospital', 'role', 'actions'];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  isLoadingResults = true;

  constructor(private snackBar: MatSnackBar,
              private userService: UserService) { }

  ngOnInit(): void {

    this.userService.getAll()
    .subscribe((res: any) => {
      this.users = res;
      this.isLoadingResults = false;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });

  }

  activateUser(userId: string) {
    this.userService.activateUser(userId).subscribe(data => {
      this.openSnackBarSuccess('Utilisateur activé!');
      this.ngOnInit();
    });
  }

  deleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe(data => {
      this.openSnackBarSuccess('Supprimé!');
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

