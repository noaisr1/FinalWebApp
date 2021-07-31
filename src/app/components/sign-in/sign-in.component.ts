import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, OnDestroy {

  subs: Subscription[] = [];

  constructor(
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subs.push(this.authService.userData.subscribe(data=>{
      if(data){
        this.router.navigate(['/']).then();
      }
    }));
  }
  ngOnDestroy():void{
    this.subs.map(s=> s.unsubscribe());
  }

  login(form: NgForm){
    const {email, password} = form.value;
    if(!form.value){
      return;
    }
    this.authService.SignIn(email,password);
    form.resetForm();
  }

}
