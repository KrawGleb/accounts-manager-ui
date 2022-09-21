import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { AccountsTableComponent } from './components/accounts-table/accounts-table.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AccountsTableComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  exports: [
    HeaderComponent,
  ]
})
export class AppCommonModule { }
