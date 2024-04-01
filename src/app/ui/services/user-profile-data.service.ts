import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment.local';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../interfaces/profile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileDataService {

  protected readonly URL = environment.backendUrl + 'users/';

  constructor(private http: HttpClient) {}

  getDataProfile(): Observable<Profile> {
    return this.http.get<Profile>(this.URL + 'profile');
  }
}
