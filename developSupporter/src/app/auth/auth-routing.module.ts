import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserAccountComponent } from './../user-account/user-account.component';
import { AuthGuard } from 'src/guards/auth.guard';
import { ConfirmationGuard } from './../../guards/confirmation.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'account', component: UserAccountComponent, canActivate: [AuthGuard], canDeactivate: [ConfirmationGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, ConfirmationGuard]
})
export class AuthRoutingModule { }
