import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { Observable } from 'rxjs/Observable';
import { MessageItem } from 'src/app/shared/interfaces/message-item.model';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {

  
  feed: any=[];

  constructor(private messages: MessagesService) { 
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.feed = this.messages.getMessages();
  }

  ngOnInit(): void {
    this.feed = this.messages.getMessages();
  }


}
