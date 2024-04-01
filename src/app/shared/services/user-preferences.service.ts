import { Injectable } from '@angular/core';
import { Profile } from '../../ui/interfaces/profile';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesService {
  private profileSubject = new BehaviorSubject<Profile>({} as Profile);

  constructor() {}

  setProfile(profile: Profile) {
    this.profileSubject.next(profile);
  }

  getProfile() {
    return this.profileSubject.asObservable();
  }
}
