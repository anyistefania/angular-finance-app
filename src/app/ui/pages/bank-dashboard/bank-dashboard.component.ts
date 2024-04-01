import { Component, OnInit } from '@angular/core';
import { Profile } from '../../interfaces/profile';
import { UserPreferencesService } from '../../../shared/services/user-preferences.service';
import { TransactionsUserDataService } from '../../services/transactions-user-data.service';
import { Transaction } from '../../interfaces/transaction';
import { catchError, take } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bank-dashboard',
  imports:[CommonModule],
  standalone:true,
  templateUrl: './bank-dashboard.component.html',
  styleUrls: ['./bank-dashboard.component.css']
})
export class BankDashboardComponent implements OnInit {
  public dataProfile: Profile = {} as Profile;
  public transactionData: Transaction[] = [];

  constructor(
    private profileBehaviorService: UserPreferencesService,
    private transactionsService: TransactionsUserDataService
  ) {}

  ngOnInit() {
    this.getProfile();
    this.getTransactions();
  }

  getProfile(): void {
    this.profileBehaviorService.getProfile().subscribe((res) => {
      this.dataProfile = res;
    });
  }

  getTransactions(): void {
    this.transactionsService.getTransactions().pipe(
      take(1), 
      catchError(error => {
        console.error('There was an error!', error);
        return throwError(() => new Error(error));
      })
    ).subscribe((data: Transaction[]) => {
      this.transactionData = data.slice(0, 10);
    });
  }

  get transactionAmount(): number {
    return this.transactionData.reduce(
      (accumulator, transaction) => accumulator + transaction.amount,
      0
    );
  }

  get transactionBalance(): number {
    return this.transactionData.reduce(
      (accumulator, transaction) => accumulator + transaction.balance,
      0
    );
  }
}
