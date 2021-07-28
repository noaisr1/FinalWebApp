import { Injectable } from '@angular/core';
<<<<<<< HEAD
//import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
=======
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
>>>>>>> f56563e8b9487afa9e7547038623c7401cfdddae
import { AngularFireAuth } from 'angularfire2/auth';
//import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor() { }
}
