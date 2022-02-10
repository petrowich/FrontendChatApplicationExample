import { Injectable } from '@angular/core';
import { ChatMessageDto } from '../models/chatMessageDto';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  URI: string = 'wss://bla-bla.site/test/chat';
  webSocket: WebSocket = new WebSocket(this.URI);
  chatMessages: ChatMessageDto[] = [];

  constructor() { }

  public openWebSocket() {
    if(this.webSocket.CLOSED) {
      this.webSocket = new WebSocket(this.URI);
    }
    
    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
    }
    
    this.webSocket.onmessage = (event) => {
      console.log('Message: ', event);
      const chatMessageDto = JSON.parse(event.data);
      this.chatMessages.push(chatMessageDto);
    }

    this.webSocket.onclose = (event) => {
      console.log('Close: ', event);
    }
  }

  public sendMessage(chatMessageDto: ChatMessageDto) {
    this.webSocket.send(JSON.stringify(chatMessageDto));
  }
 
  public closeWebSocket() {
    this.webSocket.close();
  }
}
