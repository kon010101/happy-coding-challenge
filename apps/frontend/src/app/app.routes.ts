import { Route } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const appRoutes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent },
];
