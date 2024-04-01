import { Component } from '@angular/core';
import { Profile } from '../../interfaces/profile';
import { UserPreferencesService } from '../../../shared/services/user-preferences.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  public dataProfile: Profile = {} as Profile;
  constructor(private profileBehaviorService: UserPreferencesService) {}

  ngOnInit() {
    this.getProfile();
  }

  getProfile(): void {
    this.profileBehaviorService.getProfile().subscribe((res) => {
      this.dataProfile = res;
    });
  }

}
