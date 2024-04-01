import { Component, OnInit } from '@angular/core';
import { TransactionsUserDataService } from '../../services/transactions-user-data.service';
import { Transaction } from '../../interfaces/transaction';
import { catchError, take } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-summary',
  imports: [CommonModule],
  standalone:true,
  templateUrl: './transaction-summary.component.html',
  styleUrls: ['./transaction-summary.component.css']
})
export class TransactionSummaryComponent implements OnInit {
  public transactionData: Transaction[] = [];

  constructor(private transactionsService: TransactionsUserDataService) {}

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions(): void {
    this.transactionsService.getTransactions()
      .pipe(
        take(1), // take only the first emission, unsubscribe automatically after that
        catchError(error => {
          console.error('There was an error!', error);
          return throwError(error); // rethrow the error to be caught by the subscriber
        })
      )
      .subscribe((data: Transaction[]) => {
        this.transactionData = data.slice(0, 10);
      });
  }
}
