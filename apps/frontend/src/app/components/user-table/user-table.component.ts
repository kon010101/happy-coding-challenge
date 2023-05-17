import { Component } from '@angular/core';
import { User } from '@happy-coding-challenge/types';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

const ELEMENT_DATA: User[] = [
  {
    id: '1',
    firstname: 'Konrad',
    lastname: 'Weiss',
    email: 'konradweiss@gmx.de',
    dateOfBirth: new Date(),
  },
  {
    id: '2',
    firstname: 'Konrad',
    lastname: 'Weiss',
    email: 'konradweiss@gmx.de',
    dateOfBirth: new Date(),
  },
  {
    id: '3',
    firstname: 'Konrad',
    lastname: 'Weiss',
    email: 'konradweiss@gmx.de',
    dateOfBirth: new Date(),
  },
  {
    id: '4',
    firstname: 'Konrad',
    lastname: 'Weiss',
    email: 'konradweiss@gmx.de',
    dateOfBirth: new Date(),
  },
];

@Component({
  selector: 'happy-coding-challenge-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent {
  constructor(private _dialog: MatDialog) {}

  displayedColumns: (keyof User | 'action')[] = [
    'id',
    'firstname',
    'lastname',
    'email',
    'dateOfBirth',
    'action',
  ];
  dataSource = ELEMENT_DATA;

  openDialog() {
    const dialogRef = this._dialog.open(DialogComponent);
    // dialogRef.afterClosed().subscribe({
    //   next: (val) => {
    //     if (val) {
    //       this.getEmployeeList();
    //     }
    //   },
    // });
  }
}
