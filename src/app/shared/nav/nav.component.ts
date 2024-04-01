import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { UserPreferencesService } from '../services/user-preferences.service';
import { Profile } from '../../ui/interfaces/profile';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink,  CommonModule, NgbModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  public dataProfile!: Profile;
  constructor(private userPreferencesService: UserPreferencesService) {}

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(): void {
    this.userPreferencesService.getProfile().subscribe((res) => {
      this.dataProfile = res;
    });
  }

  emptyDataProfile(obj: Profile): boolean {
    return Object.keys(obj).length > 0;
  }
}
