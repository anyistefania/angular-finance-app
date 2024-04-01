import { Component, OnInit } from '@angular/core';
import { UserPreferencesService } from '../../../shared/services/user-preferences.service';
import { CommonModule } from '@angular/common';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-account-summary',
  imports:[CommonModule],
  standalone:true,
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.css']
})
export class AccountSummaryComponent implements OnInit {
  public accounts: string[] = [];
  public error: string | null = null;

  constructor(private profileBehaviorService: UserPreferencesService) {}

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(): void {
    this.profileBehaviorService.getProfile().pipe(
      catchError(error => {
        this.error = 'Error fetching profile. Please try again later.';
        return throwError(() => new Error(error));
      })
    ).subscribe((res) => {
      if (res && res.accounts) {
        this.accounts = res.accounts;
      } else {
        this.error = 'Profile data is invalid.';
      }
    });
  }
}
