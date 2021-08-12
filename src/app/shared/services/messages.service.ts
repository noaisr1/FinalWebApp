import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import * as firebase from 'firebase';
import { User } from 'firebase';
import { AuthService } from "./auth.service";
import { AngularFireAuth } from "angularfire2/auth";

@Injectable({
  providedIn:'root'
})

export class MessagesService{
  currentUser: User;

  constructor(private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private authService: AuthService){
      this.afAuth.authState.subscribe(user=> this.currentUser=user);
    }

    getAllPosts(): Observable<any>{
      return this.afs.collection<any>('posts', ref=> ref.orderBy('time','desc'))
      .snapshotChanges().pipe(
        map((actions) => {
          return actions.map((a: any) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    }

    postMessage(message: string, ownerName: string, otherItem: any):void{
      this.afs.collection('posts').add({
        message,
        title: ownerName,
        user_id: this.currentUser.uid,
        time: firebase.firestore.FieldValue.serverTimestamp(),
        ...otherItem
      }).then(res=> console.log(res));
    }

    deletePost(postId: any){
      this.afs.collection('posts').doc(postId).delete();
    }
}