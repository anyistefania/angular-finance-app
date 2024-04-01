import { Component } from '@angular/core';
import { Profile } from '../../interfaces/profile';
import { UserPreferencesService } from '../../../shared/services/user-preferences.service';
import { TransactionsUserDataService } from '../../services/transactions-user-data.service';
import { Transaction } from '../../interfaces/transaction';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bank-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bank-dashboard.component.html',
  styleUrl: './bank-dashboard.component.css'
})
export class BankDashboardComponent {
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
    this.transactionsService.getTransactions().subscribe({
      next: (data: Transaction[]) => {
        this.transactionData = data.slice(0, 10);
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  get transactionAmount(): number {
    return this.transactionData.reduce(
      (acumulador, transaccion) => acumulador + transaccion.amount,
      0
    );
  }

  get transactionBalance(): number {
    return this.transactionData.reduce(
      (acumulador, transaccion) => acumulador + transaccion.balance,
      0
    );
  }

}
