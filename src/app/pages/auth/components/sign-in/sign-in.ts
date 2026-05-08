import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ISignInData, IAuthResponse } from '../../../../shared/models/auth.model';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-sign-in',
  imports: [FormsModule, RouterLink],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {
  signInData: ISignInData = {
    email: '',
    password: '',
  };

  private http = inject(HttpClient);
  private router = inject(Router);
  private notification = inject(NotificationService);

  constructor() {
    const registeredEmail = sessionStorage.getItem('registered_email');

    if (registeredEmail) {
      this.signInData.email = registeredEmail;
      sessionStorage.removeItem('registered_email');
    }
  }

  onSubmit() {
    this.http
      .post<IAuthResponse>('https://api.everrest.educata.dev/auth/sign_in', this.signInData)
      .subscribe({
        next: (data) => {
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);
          this.notification.success('ავტორიზაცია წარმატებით დასრულდა');
          this.router.navigateByUrl('/');
        },
        error: () => {
          this.notification.error('ავტორიზაცია ვერ შესრულდა');
        },
      });
  }
}
