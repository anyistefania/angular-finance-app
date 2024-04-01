import { Component } from '@angular/core';
import { Profile } from '../../interfaces/profile';
import { UserPreferencesService } from '../../../shared/services/user-preferences.service';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [NgbRating],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  public dataProfile: Profile = {} as Profile;
  public rating = 8;
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
