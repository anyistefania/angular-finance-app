import { Routes } from '@angular/router';
import { GlobalComponent } from './ui/pages/global/global.component';
import { HomeComponent } from './ui/pages/home/home.component';
import { BankDashboardComponent } from './ui/pages/bank-dashboard/bank-dashboard.component';
import { AuthGuard } from './authentication/utils/authentication.guard';
import { AccountSummaryComponent } from './ui/pages/account-summary/account-summary.component';
import { UserProfileComponent } from './ui/pages/user-profile/user-profile.component';
import { TransactionSummaryComponent } from './ui/pages/transaction-summary/transaction-summary.component';
import { AboutTheBankComponent } from './ui/pages/about-the-bank/about-the-bank.component';
import { ErrorComponent } from './shared/error/error.component';

export const routes: Routes = [
  {
    path: '',
    component: GlobalComponent,

    children: [

      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'dashboard',
        component: BankDashboardComponent
      },
      {
        path: 'accounts',
        component: AccountSummaryComponent
      },
      {
        path: 'profile',
        component: UserProfileComponent
      },
      {
        path: 'transactions',
        component: TransactionSummaryComponent,
      },
      {
        path: 'about',
        component: AboutTheBankComponent,
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./authentication/pages/login-user/login-user.component').then(
        (component) => component.LoginUserComponent
      ),
  },
  {
    path: 'sigin',
    loadComponent: () =>
      import('./authentication/pages/signin-user/signin-user.component').then(
        (component) => component.SigninUserComponent
      ),
  },
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '404' },
];

