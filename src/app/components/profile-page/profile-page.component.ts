import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService, UserData } from "../../shared/services/auth.service";
import { MessagesService } from 'src/app/shared/services/messages.service';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  subs: Subscription[] = [];
  posts: any[] = [];
  user: UserData;

  constructor(
    public authService: AuthService,
    private msgService: MessagesService,
    public router: Router,
    public ngZone: NgZone
  ) { }

  async ngOnInit(): Promise<void> {
    this.subs.push(this.authService.CurrentUser().subscribe(user => {
      this.user = user;
      console.log(user);
    }));

    this.subs.push(this.msgService.getAllPosts().subscribe(async (posts) => {
      this.posts = posts;
      console.log(posts);
    }));
  }

  userPosts(post: any): boolean{
    console.log(this.user.uid , post.user_id)
    if(this.user.uid == post){
      console.log("lalala")
      return true;
    }
    return false;
  }
}
