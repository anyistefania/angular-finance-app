import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserPreferencesService } from '../services/user-preferences.service';
import { CommonModule } from '@angular/common';
import { UserProfileDataService } from '../../ui/services/user-profile-data.service';
import { Profile } from '../../ui/interfaces/profile';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, NavComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  public dataProfile!: Profile;

  constructor(
    private userPreferencesService: UserPreferencesService,
    private userProfileDataService: UserProfileDataService
  ) {}

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.userProfileDataService.getDataProfile().subscribe({
      next: (data) => {
        this.dataProfile = data;
        this.userPreferencesService.setProfile(this.dataProfile);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}

