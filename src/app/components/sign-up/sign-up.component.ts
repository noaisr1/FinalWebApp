import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  ages: number[]=[];
  selectedAge=0;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    for (var i = 1; i < 100; i++) {
      this.ages[i] = i;
    }

  }

}
