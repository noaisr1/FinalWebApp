import { Injectable } from "@angular/core";
import { AngularFireAuth, AngularFireAuthModule } from "angularfire2/auth";
import { BehaviorSubject, Observable } from "rxjs";
import * as firebase from 'firebase/app';
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'

})

export class AuthService {

  private _userData: Observable<firebase.User>;
  public currentUser: UserData | null;
  private currentUser$ = new BehaviorSubject<UserData>(null);

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore
  ) {
    this._userData = afAuth.authState;
    this._userData.subscribe(user => {
      if (user) {
        this.afs.collection<UserData>('users')
          .doc<UserData>(user.uid)
          .valueChanges()
          .subscribe(currentUser => {
            this.currentUser = currentUser;
            this.currentUser.uid = user.uid;
            this.currentUser$.next(currentUser);
          });
      }
    });
  }
  CurrentUser(): Observable<UserData> {
    return this.currentUser$.asObservable();
  }

  SignUp(email: string, password: string, displayName: string) {
    console.log(email, password, displayName);

    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        if (res) {
          this.afs.collection('users').doc(res.user.uid)
            .set({
              email,
              displayName,
              admin: false,
              picture: "assets/img/no-image-icon.jpg",
            }).then(value => {
              this.afs.collection<UserData>('users')
                .doc<UserData>(res.user.uid)
                .valueChanges()
                .subscribe(user => {
                  console.log(user);
                  if (user) {
                    this.currentUser$.next(user);
                  }
                  this.SendVerificationMail();
                });
            });
        }
      })
      .catch((error) => {
        console.log(`Something went wrong ${error.message}`);
        window.alert(error);
      })
  }


  get userData(): Observable<firebase.User> {
    return this._userData;
  }

  SignIn(email: string, password: string): void {
    console.log(email, password);
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res);
        this._userData = this.afAuth.authState;
        this.afs.collection<UserData>('users')
          .doc<UserData>(res.user.uid)
          .valueChanges()
          .subscribe((user) => {
            console.log(user);
            this.currentUser = user;
            this.currentUser$.next(this.currentUser);
            if( ! firebase.auth().currentUser.emailVerified){
              window.alert("Please Verify Your Email Account");
              this.router.navigate(['sign-in']);
            }
            else{
              this.router.navigate(['dashboard']);
            }
          });
      }).catch((error) => {
        console.log(error.message);
        window.alert(error);
      });
  }

  SignOut(): void {
    this.afAuth.signOut().then(res => {
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
    return this.afAuth.currentUser.then((user) => {
      return user?.sendEmailVerification();
    })
      .then(() => {
        this.router.navigate(['verify-email-address']);
      })
  }

  updateEmailAddress(newEmail: string, lastEmail: string, password: any) {
    firebase.auth().signInWithEmailAndPassword(lastEmail, password)
      .then(function (userCredential) {
        userCredential.user.updateEmail(newEmail);
      }).then(() => {
        this._userData.subscribe(user => {
          if (user) {
            this.afs.collection<UserData>('users')
              .doc<UserData>(user.uid)
              .update({ email: newEmail }).then(() => {
                console.log("changed successfully")
              });
          }
        });
      }).catch(function (error) {
        alert(error);
        return;
      })

  }

  ResetPassword(email: string){
    return this.afAuth.sendPasswordResetEmail(email)
    .then(()=>{
      window.alert("Password reset email has been sent to "+email),
      this.router.navigate(['sign-in']);
    }).catch(error=>window.alert(error.code + " for password reset")); 
  }
}

export interface UserData {
  uid?: string;
  email: string;
  displayName: string;
  admin: boolean;
  picture: string;
}