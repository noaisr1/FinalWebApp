import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  email!: string;
  password!: string;
  displayName!: string;
  errMsg!: string;

  constructor(
    public authService: AuthService
  ) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
