import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
//import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

import * as firebase from 'firebase/app';

import { MessageItem } from '../interfaces/message-item.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  user!: firebase.User;
  messages!: AngularFireList<any>;
  message!: MessageItem;
  userName!: Observable<String>;


  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
  ) { 
    this.afAuth.authState.subscribe(auth=>{
      if(auth!== undefined && auth!== null){
        this.user=auth;
      }
    });
  }

  postMessage(msg: string){
    const timestamp = this.getTimeStamp();
    const email = "text@gmail.com"
    //const email = this.user.email;
    
    this.messages.push({
      message: msg,
      timeSent: timestamp,
      username: "testUser",
      //userName: this.userName,
      email: email
    });
  }
  getTimeStamp(){
    const now = new Date();
    const date = 
    now.getUTCFullYear() + '/' 
    + (now.getUTCMonth()+1) + '/' 
    + (now.getUTCDate());
    const time = now.getUTCHours()+ ':' + now.getUTCMinutes();

    return (date + ' ' + time);

  }

  getMessages(): Observable<any>{
    // Query to create our message feed binding
    this.messages=this.db.list('messages');
    return this.messages.valueChanges();
  }
}
