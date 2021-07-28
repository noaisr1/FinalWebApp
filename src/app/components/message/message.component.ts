import { Component, OnInit, Input } from '@angular/core';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MessageItem } from 'src/app/shared/interfaces/message-item.model';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() message!: MessageItem;
  userEmail!: string;
  userName!: string;
  messageContent!: string;
  timeStamp: Date = new Date();
  // isOwnMessage: boolean;

  constructor() { }

  ngOnInit(message = this.message) {
    this.messageContent = message.message!;
    this.timeStamp = message.timeSent!;
    this.userEmail = message.email!;
    this.userName = message.userName!;
  }

}
