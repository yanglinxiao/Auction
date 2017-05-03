import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import {Observable} from "rxjs";

@Injectable()
export class WebSocketService {
  private ws : WebSocket;

  constructor() { }

  createObservableSocket(url : string,productId : number) : Observable<any>{
    this.ws = new WebSocket(url);
    return new Observable<string>(
      observer => {
        this.ws.onmessage = (event => observer.next(event.data));
        this.ws.onerror = (event => observer.error(event));
        this.ws.onclose = (event => observer.complete());
        this.ws.onopen = (event => this.sendMessage({productId : productId}))
        return () => this.ws.close();
      }
    ).map(productsPriceInfo => JSON.parse(productsPriceInfo))
  }

  sendMessage(message : any){
    this.ws.send(JSON.stringify(message));
  }
}
