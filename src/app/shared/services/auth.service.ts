import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { BehaviorSubject, Observable } from "rxjs";
import * as firebase from 'firebase/app';
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'

})

export class AuthService{

  private _userData: Observable<firebase.User>;
  public currentUser: UserData|null;
  private currentUser$ = new BehaviorSubject<UserData>(null);

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore
  ){
    this._userData = afAuth.authState;
    this._userData.subscribe(user=>{
      if(user){
        this.afs.collection<UserData>('users')
        .doc<UserData>(user.uid)
        .valueChanges()
        .subscribe(currentUser=>{
          this.currentUser = currentUser;
          this.currentUser$.next(currentUser);
        });
      }
    });
  }
  CurrentUser(): Observable<UserData>{
    return this.currentUser$.asObservable();
  }

  SignUp(email: string, password: string, displayName: string){
    console.log(email,password,displayName)
    this.afAuth.createUserWithEmailAndPassword(email,password)
    .then(res=>{
      if(res){
        this.afs.collection('users').doc(res.user.uid)
        .set({
          email,
          displayName
        }).then(value=>{
          this.afs.collection<UserData>('users')
          .doc<UserData>(res.user.uid)
          .valueChanges()
          .subscribe(user=>{
            console.log(user);
            if(user){
              this.currentUser$.next(user);
            }
          });
        });
      }
    })
    .catch(err=> console.log(`Something went wrong ${err.message}`));
  }

  get userData(): Observable<firebase.User>{
    return this._userData;
  }

  SignIn(email: string, password: string):void{
    console.log(email, password);

    this.afAuth.signInWithEmailAndPassword(email, password)
    .then(res=>{
      console.log(res);
      this._userData = this.afAuth.authState;

      this.afs.collection<UserData>('users')
      .doc<UserData>(res.user.uid)
      .valueChanges()
      .subscribe((user)=>{
        console.log(user);
        this.currentUser=user;
        this.currentUser$.next(this.currentUser);
        this.router.navigate(['dashboard']);
      });
    }).catch(err=> console.log(err.message));
  }

  SignOut(): void{
    this.afAuth.signOut().then(res=>{
      console.log(res);
      this.currentUser = null;
      this.currentUser$.next(this.currentUser);
      this.router.navigate(['sign-in']);

    })
  }

  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser.then((user)=>{
      return user?.sendEmailVerification();
    })
    .then(() => {
      this.router.navigate(['verify-email-address']);
    })
  }
}



export interface UserData{
  uid?: string;
  email: string;
  displayName: string;
}