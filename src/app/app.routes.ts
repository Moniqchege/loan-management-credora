import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

import { LoginComponent } from './features/auth/login/login.component';

import { RegisterComponent } from './features/auth/register/register.component';

import { DashboardComponent } from './features/dashboard/dashboard.component';

import { CustomersComponent } from './features/customers/customers.component';

import { LoansComponent } from './features/loans/loans.component';
import { AuthGuard } from './shared/guards/auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'customers',
    component: CustomersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'loans',
    component: LoansComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'login' }
];

export const appRouterProviders = [provideRouter(routes)];
