import { Component } from '@angular/core';
import { TransactionsUserDataService } from '../../services/transactions-user-data.service';
import { Transaction } from '../../interfaces/transaction';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-summary.component.html',
  styleUrl: './transaction-summary.component.css'
})
export class TransactionSummaryComponent {
  public transactionData: Transaction[] = [];
  constructor(private transactionsService: TransactionsUserDataService) {}

  ngOnInit(): void {
    this.getTransactions();
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
}
