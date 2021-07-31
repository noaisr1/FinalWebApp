import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//import {MaterialModule} from './shared/material.module';
import {AppRoutingModule} from './app-routing.module';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';

import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FeedComponent } from './components/feed/feed.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthService } from './shared/services/auth.service';
import { MessagesService } from './shared/services/messages.service';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    FeedComponent,
    FooterComponent,
    HeaderComponent,
    NavBarComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    ProfilePageComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    //MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [AuthService,MessagesService],
  bootstrap: [AppComponent]
})
export class AppModule {
}