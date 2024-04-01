import { Component, OnInit } from '@angular/core';
import { Profile } from '../../interfaces/profile';
import { UserPreferencesService } from '../../../shared/services/user-preferences.service';
import { catchError, take } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public dataProfile: Profile = {} as Profile;

  constructor(private profileBehaviorService: UserPreferencesService) {}

  ngOnInit() {
    this.getProfile();
  }

  getProfile(): void {
    this.profileBehaviorService.getProfile()
      .pipe(
        take(1), 
        catchError(error => {
          console.error('Error fetching profile:', error);
          return throwError(() => new Error(error)); 
          
        })
      )
      .subscribe((res) => {
        this.dataProfile = res;
      });
  }
}
