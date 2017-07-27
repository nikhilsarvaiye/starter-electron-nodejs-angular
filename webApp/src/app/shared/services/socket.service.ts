import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

import { IMessage } from '../../../models';

export class SocketService {
  private host: string = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
  socketName: string;
  socket: SocketIOClient.Socket;

  constructor(private name?: string) {
    let socketUrl = this.host + '/' + this.name;
    this.socketName = this.name;
    this.socket = io.connect(socketUrl);
  }

  // Get items observable
  items(): Observable<any> {
    return Observable.create(observer => {
      this.socket.on('items', (items: any) => {
        observer.next(items)
      });
    });
  }

  // Get items observable
  item(): Observable<any> {
    return Observable.create(observer => {
      this.socket.on('item', (item: any) => {
        observer.next(item)
      });
    });
  }

  // Get items observable
  updateItem(): Observable<any> {
    return Observable.create(observer => {
      this.socket.on('update-item', (item: any) => {
        debugger
        observer.next(item)
      });
    });
  }

  // Request initial list when connected
  list(): void {
    this.socket.emit('list');
  }

  // Request initial user rooms when connected
  getUserRooms(userId: string): void {
    this.socket.emit('list', userId);
  }

  // Request initial user rooms when connected
  userTyping(userId: string): void {
    this.socket.emit('typing', userId);
  }

  onTypingUser(userId: string): void {
    this.socket.emit('typing-user', userId);
  }

  // Create signal
  create(params: any) {
    this.socket.emit('create', params);
  }

  update(params: any) {
    this.socket.emit('update', params);
  }

  // Remove signal
  remove(params: any) {
    this.socket.emit('remove', params);
  }

  onConnect(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('connect', () => observer.complete());
    })
  }

  onUserJoin(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('user-joined', (user: any) => {
        observer.next(user);
      });
    })
  }

  onUserLeft(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('user-left', (user: any) => {
        observer.next(user);
      });
    })
  }

  onDisconnect(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('disconnect', () => observer.complete());
    })
  }
}
