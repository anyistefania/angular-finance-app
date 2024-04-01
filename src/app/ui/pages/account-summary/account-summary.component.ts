import { Component } from '@angular/core';
import { UserPreferencesService } from '../../../shared/services/user-preferences.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account-summary.component.html',
  styleUrl: './account-summary.component.css'
})
export class AccountSummaryComponent {
  public accounts: string[] = [];

  constructor(private profileBehaviorService: UserPreferencesService) {}

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(): void {
    this.profileBehaviorService.getProfile().subscribe((res) => {
      this.accounts = res.accounts;
    });
  }
}
