import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { Observable } from 'rxjs/Observable';
import { AuthService, UserData } from 'src/app/shared/services/auth.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  subs: Subscription[] = [];
  posts: any[] = [];
  user: UserData;

  constructor(
    private msgService: MessagesService,
    private authService: AuthService
  ) {

  }



  async ngOnInit(): Promise<void> {
    this.subs.push(this.msgService.getAllPosts().subscribe(async (posts) => {
      this.posts = posts;
      console.log(posts);
    }));
    this.subs.push(this.authService.CurrentUser().subscribe(user => {
      this.user = user;
      console.log(user);
    }));
  }

  postMessage(form: NgForm): void {
    const { message } = form.value;
    this.msgService.postMessage(message,
      `${this.user.displayName}`, {
      displayName: this.user.displayName
    },);
    form.resetForm();
  }

}
