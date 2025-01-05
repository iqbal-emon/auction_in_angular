import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { Env } from '../../environments/env';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private apiUrl = Env.baseUrl;
  private hubConnection: HubConnection;
  private productSubject: Subject<any> = new Subject<any>();
  private bidSubject: Subject<any> = new Subject<any>();

  constructor() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.apiUrl + 'productHub')
      .build();
    this.hubConnection.on('ReceiveProduct', (product: any) => {
      this.productSubject.next(product);
    });
    this.hubConnection.on('ReceiveBid', (product: any) => {
      this.bidSubject.next(product);
    });
  }

  public startConnection(): void {
    this.hubConnection
      .start()
      .then(() => console.log('SignalR connection established'))
      .catch((err) =>
        console.error('Error while establishing connection', err)
      );
  }

  public getNewProduct() {
    return this.productSubject.asObservable();
  }

  public getNewBid() {
    return this.bidSubject.asObservable();
  }
}
