import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { customClaims, redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { authRoute, unauthorisedRoute, authorisedRoute } from '../environments/environment';

import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { NotAuthorisedComponent } from './not-authorised/not-authorised.component';
import { NotFoundComponent } from './not-found/not-found.component';

const redirectUnauthenticatedToLogin = () => redirectUnauthorizedTo([authRoute]);
const redirectTo403OrHome = () => pipe(customClaims, map(claims => (!claims.hasOwnProperty("admin") || claims.admin == false) ? true : [authorisedRoute]));
const redirectToHomeOr403 = () => pipe(customClaims, map(claims => (claims.hasOwnProperty("admin") && claims.admin == true) ? true : [unauthorisedRoute]));

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: HomeComponent, ...canActivate(redirectToHomeOr403) },
  { path: 'profile', component: ProfileComponent, ...canActivate(redirectUnauthenticatedToLogin) },
  { path: '403', component: NotAuthorisedComponent, ...canActivate(redirectTo403OrHome) },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
