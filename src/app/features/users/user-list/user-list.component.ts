
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';

// Custom imports
import { AppState } from '../../store';
import { newUser, editUser } from '../../store/user';
import { UserModel } from '../../models/user.model';
import { UsersService } from '../../services/users/users.service';
import { LoadingService } from '../../services/loading/loading.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { AlertConfirmComponent } from '../../shared/alert-confirm/alert-confirm.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = [
    'rut',
    'name',
    'lastname',
    'age',
    'address',
    'actions',
  ];
  dataSource = new MatTableDataSource<UserModel>();
  constructor(
    private userservice: UsersService,
    private loadingService: LoadingService,
    private store: Store<AppState>,
    private dialog: MatDialog,
    private snackBar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loadingService.openSpinner();
    this.userservice.getAllPerson().then((res) => {
      this.loadingService.closeSpinner();
      this.dataSource = new MatTableDataSource(res as UserModel[]);
      this.dataSource.paginator = this.paginator;
    });
  }

  newUser() {
    this.store.dispatch(newUser());
  }

  delete(data: UserModel) {
    const height = `${(window.innerHeight * 20) / 100}px`;
    const width = `${(window.innerWidth * 40) / 100}px`;
    this.dialog
      .open(AlertConfirmComponent, {
        disableClose: true,
        data,
        height,
        width,
      })
      .afterClosed()
      .toPromise()
      .then((del) => {
        if (del === true) {
          this.loadingService.openSpinner();
          this.userservice
            .deletePerson(data.person_id)
            .toPromise()
            .then((resp) => {
              this.loadingService.closeSpinner();
              this.snackBar.open(resp.message);
              this.loadData();
            })
            .catch((err) => {
              this.snackBar.open(err);
            });
        }
      });
  }

  edit(data: UserModel) {
    this.store.dispatch(editUser({ user: data }));
  }
}
