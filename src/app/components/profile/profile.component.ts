import { Component, OnInit } from '@angular/core';
import { UserProfileModel } from 'src/app/models/profile/userProfile.model';
import { ResponseModel } from 'src/app/models/response.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  constructor(
    private profileService: ProfileService,
    private authService: AuthenticationService
  ) { }
    
    ngOnInit(): void {
      this.fetchUserProfile();
    }
    
  userProfile: UserProfileModel | null = null;
  
  fetchUserProfile(): void {
    this.profileService.getUserProfile().subscribe({
      next: (response: ResponseModel<UserProfileModel>) => {
        console.log("success", response);

        this.userProfile = response.data;
      },
      error: (error) => {
        console.error('Failed to fetch user profile:', error);
      }
    });
  }

  onLogoutClick() : void {
    this.authService.logout();
  }
}
