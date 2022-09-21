import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../../../models/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private readonly BASE_URL = 'https://accounts-manager-api.herokuapp.com/api';

  constructor(private readonly httpClient: HttpClient) {}

  public getAccounts() {
    const tokenHeader = this.getTokenHeader();
    return this.httpClient.get<Account[]>(this.BASE_URL + '/accounts', {
      headers: tokenHeader,
    });
  }

  public deleteAccountById(id: string) {
    const tokenHeader = this.getTokenHeader();
    return this.httpClient.delete(this.BASE_URL + `/accounts/${id}`, {
      headers: tokenHeader,
     });
  }

  public blockAccountById(id: string) {
    const tokenHeader = this.getTokenHeader();
    return this.httpClient.patch(this.BASE_URL + `/accounts/block/${id}`, "", {
      headers: tokenHeader,
     });
  }

  public unblockAccountById(id: string) {
    const tokenHeader = this.getTokenHeader();
    return this.httpClient.patch(this.BASE_URL + `/accounts/unblock/${id}`, "", {
      headers: tokenHeader,
     });
  }

  private getTokenHeader() {
    return new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
  }
}
