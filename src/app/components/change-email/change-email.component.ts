
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService, UserData } from 'src/app/shared/services/auth.service';
import { FormGroup, NgForm, Validators} from '@angular/forms';
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})

export class ChangeEmailComponent implements OnInit {
  user: UserData = {} as UserData;
  sameEmailError:boolean = false;
  lastEmailinvalid = false;
  lastEmailNull: boolean = false;
  newEmailNull: boolean = false;
  passwordNull: boolean = false;
  invalidEmail:boolean = false;
  invalidPassword:boolean = false;
  lastEmailAddress = '';
  newEmailAddress = '';
  confPassword:any = ''

  constructor(
    private authService: AuthService,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.authService.CurrentUser().subscribe(user => {
      this.user =  user;
      console.log(user)
      //make an error if the user does not connect
    });
  }

  onNewEmail(form: NgForm){
    this.sameEmailError = false;
    this.lastEmailinvalid = false;
    this.lastEmailNull = false;
    this.newEmailNull = false;
    this.passwordNull = false;
    this.invalidEmail = false;
    this.invalidPassword = false;

    const {lastEmail, newEmail, password} = form.value;
    if(!form.value){
      return;
    }
    console.log(lastEmail);
    console.log(newEmail);
    console.log(password);

    if(lastEmail == newEmail){
      this.sameEmailError = true;
    }

    if(lastEmail != this.user.email){
      this.lastEmailinvalid = true;
    }

    const regularExpression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!regularExpression.test(String(newEmail).toLowerCase())){
      this.invalidEmail = true;
    }

    if(lastEmail == ''){
      this.lastEmailNull = true;
    }

    if(newEmail == ''){
      this.newEmailNull = true;
    }

    if(password == ''){
      this.passwordNull = true;
    }

    if(this.sameEmailError || this.lastEmailinvalid || this.lastEmailNull || this.newEmailNull || this.passwordNull || this.invalidEmail || this.invalidPassword) return;
    //check if the password is correct
    
    this.authService.updateEmailAddress(newEmail,lastEmail,password);
    form.resetForm();

    

    console.log(this.user)
  }
  
  changeEmail(){}
}
