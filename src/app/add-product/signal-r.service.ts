import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection: HubConnection;
  private productSubject: Subject<any> = new Subject<any>(); // Not type-specific

  constructor() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7111/productHub') // Ensure this URL matches the server's SignalR URL
      .build();
    console.log('hub connection is', this.hubConnection);
    this.hubConnection.on('ReceiveProduct', (product: any) => {
      console.log('New product received:', product);
      // Emit the new product to the productSubject
      this.productSubject.next(product);
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
    return this.productSubject.asObservable(); // Returning a generic observable
  }
}
