import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';
import { unauthorisedRoute, authorisedRoute } from '../environments/environment';

import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';

const adminOnly = () => hasCustomClaim('admin');
const redirectUnauthorizedToAuth = () => redirectUnauthorizedTo([unauthorisedRoute]);
const redirectLoggedInToHome = () => redirectLoggedInTo([authorisedRoute]);

const routes: Routes = [
  { path: 'auth', component: AuthComponent, ...canActivate(redirectLoggedInToHome) },
  { path: 'home', component: HomeComponent, ...canActivate(adminOnly) },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
