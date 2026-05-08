import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ISignUpData } from '../../../../shared/models/auth.model';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-sign-up',
  imports: [FormsModule, RouterLink],
  templateUrl: './sign-up.html',
  styleUrl: '../sign-in/sign-in.css',
})
export class SignUp {
  signUpData: ISignUpData = {
    firstName: '',
    lastName: '',
    age: 0,
    email: '',
    password: '',
    address: '',
    phone: '',
    zipcode: '',
    avatar: '',
    gender: 'MALE',
  };

  private http = inject(HttpClient);
  private router = inject(Router);
  private notification = inject(NotificationService);

  onSubmit() {
    this.http
      .post<any>('https://api.everrest.educata.dev/auth/sign_up', this.signUpData)
      .subscribe({
        next: (data) => {
          sessionStorage.setItem('registered_email', data.email);
          this.notification.success('რეგისტრაცია წარმატებით დასრულდა');
          this.router.navigateByUrl('/auth/sign-in');
        },
        error: () => {
          this.notification.error('რეგისტრაცია ვერ შესრულდა');
        },
      });
  }
}
