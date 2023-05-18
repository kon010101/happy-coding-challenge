import { Component, OnInit } from '@angular/core';
import { User } from '@happy-coding-challenge/types';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../../services/users.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'happy-coding-challenge-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit {
  constructor(
    private _dialog: MatDialog,
    private _usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  displayedColumns: (keyof User | 'action')[] = [
    'firstname',
    'lastname',
    'email',
    'dateOfBirth',
    'action',
  ];
  dataSource!: MatTableDataSource<User>;

  getUsers() {
    this._usersService.getUsers().subscribe({
      next: (res: User[]) => {
        this.dataSource = new MatTableDataSource(res);
      },
      error: console.log,
    });
  }

  deleteUser(id: string) {
    this._usersService.deleteUser(id).subscribe({
      next: (res) => {
        alert('User deleted');
        this.getUsers();
      },
    });
  }

  openAddDialog() {
    const dialogRef = this._dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUsers();
        }
      },
    });
  }

  openEditDialog(data: User) {
    const dialogRef = this._dialog.open(DialogComponent, { data });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUsers();
        }
      },
    });
  }
}
