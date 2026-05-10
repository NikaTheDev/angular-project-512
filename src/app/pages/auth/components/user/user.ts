import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [FormsModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  userData = signal<any>(null);

  activeSection = signal('profile');
  activeSettingsForm = signal('');

  profileMessage = signal('');
  passwordMessage = signal('');

  editProfile = {
    firstName: '',
    lastName: '',
    age: 0,
    email: '',
    address: '',
    phone: '',
    zipcode: '',
    avatar: '',
    gender: 'MALE',
  };

  passwordData = {
    oldPassword: '',
    newPassword: '',
  };

  private http = inject(HttpClient);
  private router = inject(Router);

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const token = localStorage.getItem('access_token');

    this.http
      .get<any>('https://api.everrest.educata.dev/auth', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .subscribe({
        next: (data) => {
          this.userData.set(data);

          this.editProfile = {
            firstName: data.firstName,
            lastName: data.lastName,
            age: data.age,
            email: data.email,
            address: data.address,
            phone: data.phone,
            zipcode: data.zipcode,
            avatar: data.avatar,
            gender: data.gender,
          };
        },
      });
  }

  showProfile() {
    this.activeSection.set('profile');
  }

  showFavorites() {
    this.activeSection.set('favorites');
  }

  showOrders() {
    this.activeSection.set('orders');
  }

  showSettings() {
    this.activeSection.set('settings');
    this.activeSettingsForm.set('');
  }

  showEditProfileForm() {
    this.activeSettingsForm.set('profile');
  }

  showPasswordForm() {
    this.activeSettingsForm.set('password');
  }

  updateProfile() {
    const token = localStorage.getItem('access_token');

    this.http
      .patch<any>('https://api.everrest.educata.dev/auth/update', this.editProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .subscribe({
        next: (updatedUser) => {
          this.userData.set(updatedUser);
          this.profileMessage.set('Profile updated successfully');
        },
        error: () => {
          this.profileMessage.set('Could not update profile');
        },
      });
  }

  changePassword() {
    const token = localStorage.getItem('access_token');

    this.http
      .patch<any>('https://api.everrest.educata.dev/auth/change_password', this.passwordData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .subscribe({
        next: (data) => {
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);

          this.passwordData = {
            oldPassword: '',
            newPassword: '',
          };

          this.passwordMessage.set('Password changed successfully');
        },
        error: () => {
          this.passwordMessage.set('Could not change password');
        },
      });
  }

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
}
