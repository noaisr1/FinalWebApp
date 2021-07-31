import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {


  signUpForm: FormGroup = this.fb.group({
    email: ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required]],
    displayName: ['',[Validators.required]]
  })

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
  ) { }
  ngOnInit(): void {

  }

  signUp(form: NgForm){
    const {email, displayName, password} = form.value;
    if(!form.value){
      return;
    }
    this.authService.SignUp(email,password,displayName);
    form.resetForm();
  }

}
