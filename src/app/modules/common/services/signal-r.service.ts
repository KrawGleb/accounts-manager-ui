import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection?: signalR.HubConnection;

  public startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://accounts-manager-api.herokuapp.com/hub')
      .build();

      this.hubConnection
        .start()
        .then(() => console.log('Connection started'))
        .catch(err => console.log(`Error while starting connection: ${err}`));
  }

  public addNewAccountListener(handler: () => void) {
    this.hubConnection?.on('NewAccount', handler);
  }

  public addAccountDeletedListener(handler: (parameter?: any) => void) {
    this.hubConnection?.on('AccountDeleted', handler);
  }

  public addAccountBlockedListener(handler: (parameter?: any) => void) {
    this.hubConnection?.on('AccountBlocked', handler);
  }

  public addAccountUnblockedListener(handler: (parameter?: any) => void) {
    this.hubConnection?.on('AccountUnblocked', handler);
  }
}
