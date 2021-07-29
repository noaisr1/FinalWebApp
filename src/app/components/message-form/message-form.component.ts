import { Component, OnInit } from '@angular/core';
import { Event } from '@angular/router';
import { MessagesService } from 'src/app/shared/services/messages.service';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent implements OnInit {
  message!: string;
  constructor(
    private messages: MessagesService
  ) { }

  ngOnInit(): void {
  }

  post(){
    this.messages.postMessage(this.message);
    this.message = '';
  }

  handleSubmit(event: { keyCode: number; }){
    if(event.keyCode === 13){
      this.post();
    }
  }

}
