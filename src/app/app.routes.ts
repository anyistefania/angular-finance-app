import { Routes } from '@angular/router';
import { GlobalComponent } from './ui/pages/global/global.component';
import { AuthGuard } from './authentication/utils/authentication.guard';
import { ErrorComponent } from './shared/error/error.component';
import { BankDashboardComponent } from './ui/pages/bank-dashboard/bank-dashboard.component';
import { AccountSummaryComponent } from './ui/pages/account-summary/account-summary.component';
import { UserProfileComponent } from './ui/pages/user-profile/user-profile.component';
import { TransactionSummaryComponent } from './ui/pages/transaction-summary/transaction-summary.component';
import { AboutTheBankComponent } from './ui/pages/about-the-bank/about-the-bank.component';
import { HomeComponent } from './ui/pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: GlobalComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'dashboard', component: BankDashboardComponent, canActivate: [AuthGuard] },
      { path: 'accounts', component: AccountSummaryComponent, canActivate: [AuthGuard] },
      { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
      { path: 'transactions', component: TransactionSummaryComponent },
      { path: 'about', component: AboutTheBankComponent },
    ],
  },
  { path: 'login', loadChildren: () => import('./authentication/pages/login-user/login-user.component').then(m => m.LoginUserComponent) },
  { path: 'signin', loadChildren: () => import('./authentication/pages/signin-user/signin-user.component').then(m => m.SigninUserComponent) },
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '404' },
];
