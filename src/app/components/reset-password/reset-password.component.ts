import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserData } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  user: UserData = {} as UserData;
  emailValid:boolean =false;
  email = '';
  
  
  constructor(private authService: AuthService,) { }

  ngOnInit(): void {
    this.authService.CurrentUser().subscribe(user => {
      this.user =  user;
      });
  }


  onPwdReset(form: NgForm){
    this.emailValid = false;
    const {email} = form.value;
    if(!form.value){
      return;
    }
    if(email == this.user.email){
      this.emailValid = true;
    }
    if(!this.emailValid){
       return;
    }
    this.authService.ResetPassword(email);
    form.resetForm(); 
  }
}
