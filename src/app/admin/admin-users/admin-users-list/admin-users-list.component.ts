import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../services/user/user';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-users-list',
  templateUrl: './admin-users-list.component.html',
  styleUrls: ['./admin-users-list.component.css']
})
export class AdminUsersListComponent implements OnInit {

  users: User[] = [];
  columnsToDisplay: string[] = ['name', 'email', 'role', 'hospital', 'actions'];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  isLoadingResults = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.userService.getAll()
    .subscribe((res: any) => {
      this.users = res;
      console.log(this.users);
      this.isLoadingResults = false;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });

  }

}
