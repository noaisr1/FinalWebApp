import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService, UserData } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-change-name',
  templateUrl: './change-name.component.html',
  styleUrls: ['./change-name.component.css']
})
export class ChangeNameComponent implements OnInit {
  user: UserData = {} as UserData;
  newDisplayName = '';
  showSameNameError:boolean = false;
  notNull:boolean = false;


  constructor(
    private authService: AuthService,
    private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.authService.CurrentUser().subscribe(user => {
      this.user =  user;
      console.log(user)
    });
  }
 
  changeNickname(): void {
    if( this.newDisplayName == this.user.displayName){
      this.showSameNameError = true;
      this.notNull = false;
      console.log("same")
      return;
    }
    if(this.newDisplayName == ''){
      this.notNull = true;
      this.showSameNameError = false;
      console.log("nickname is null");
      return;
    }
    this.notNull = false;
    this.showSameNameError = false;
    this.afs.collection<UserData>('users')
        .doc<UserData>(this.user.uid)
        .update({displayName:this.newDisplayName}).then(()=>{
          console.log("changed successfully")
        })
  }
}
