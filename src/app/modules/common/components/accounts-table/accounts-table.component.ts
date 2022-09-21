import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Account } from 'src/app/models/account.model';
import { AccountState } from 'src/app/models/enums/account-status.enum';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { AccountsService } from 'src/app/modules/common/services/accounts.service';
import { SignalRService } from 'src/app/modules/common/services/signal-r.service';

@Component({
  selector: 'acm-accounts-table',
  templateUrl: './accounts-table.component.html',
  styleUrls: ['./accounts-table.component.scss'],
})
export class AccountsTableComponent implements OnInit {
  public displayedColumns = [
    'select',
    'id',
    'name',
    'email',
    'registrationDate',
    'lastLoginDate',
    'status',
  ];
  public dataSource = new MatTableDataSource<Account>();
  public selection = new SelectionModel<Account>(true, []);

  constructor(
    private readonly accountsService: AccountsService,
    private readonly signalRService: SignalRService,
    private readonly router: Router) {
    this.loadAccounts();
    this.setUpHub();
  }

  ngOnInit(): void {}

  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    return numSelected === numRows;
  }

  public masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  public deleteSelectedAccounts() {
    this.selection.selected.forEach((account) =>
      this.accountsService
        .deleteAccountById(account.id)
        .pipe(tap(() => this.loadAccounts()))
        .subscribe()
    );
  }

  public blockSelectedAccounts() {
    this.selection.selected.forEach((account) =>
      this.accountsService
        .blockAccountById(account.id)
        .pipe(tap(() => this.loadAccounts()))
        .subscribe()
    );
  }

  public unblockSelectedAccounts() {
    this.selection.selected.forEach((account) =>
      this.accountsService
        .unblockAccountById(account.id)
        .pipe(tap(() => this.loadAccounts()))
        .subscribe()
    );
  }

  public getMyId() {
    return localStorage.getItem('my_id');
  }

  public stateToString(state: AccountState) {
    if (state === AccountState.Active) {
      return "Active";
    }
    else {
      return "Blocked";
    }
  }

  private loadAccounts() {
    this.accountsService
      .getAccounts()
      .pipe(
        tap((response) => {
          this.dataSource = new MatTableDataSource<Account>(response);
          this.selection.clear();
        })
      )
      .subscribe();
  }

  private setUpHub() {
    this.signalRService.startConnection();

    this.signalRService.addNewAccountListener(() => this.loadAccounts());

    this.signalRService.addAccountBlockedListener((id: string) => {
      console.log(`Block: ${id}`);
      if (id === localStorage.getItem('my_id')) {
        localStorage.removeItem('token');

        this.router.navigateByUrl('/login');
      }

      this.loadAccounts();
    });

    this.signalRService.addAccountUnblockedListener((id: string) => {
      console.log(`Unblock: ${id}`);
      this.loadAccounts();
    });

    this.signalRService.addAccountDeletedListener((id: string) => {
      console.log(`Delete: ${id}`);
      if (id === localStorage.getItem('my_id')) {
        localStorage.removeItem('token');

        this.router.navigateByUrl('/login');
      }

      this.loadAccounts();
    });
  }
}
