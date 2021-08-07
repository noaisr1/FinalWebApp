import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { ChangeNameComponent } from './components/change-name/change-name.component';
import { ChangeEmailComponent } from './components/change-email/change-email.component';

import { AuthGuard } from './shared/guards/auth.guard';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'profile-page', component: ProfilePageComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'change-name', component: ChangeNameComponent },
  { path: 'change-email', component: ChangeEmailComponent },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }