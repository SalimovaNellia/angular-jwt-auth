import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/profile.component";
import {AuthGuard} from "./auth.guard";



const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [ AuthGuard ] },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
