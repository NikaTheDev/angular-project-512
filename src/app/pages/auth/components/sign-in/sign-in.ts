import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [FormsModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {
  signInData = {
    email: '',
    password: '',
  };

  private http = inject(HttpClient);
  private router = inject(Router);

  onSubmit() {
    this.http.post('https://api.everrest.educata.dev/auth/sign_in', this.signInData).subscribe({
      next: (data: any) => {
        (localStorage.setItem('access_token', data.access_token),
          localStorage.setItem('refresh_token', data.refresh_token));
        this.router.navigateByUrl('/');
      },
      error: () => {
        alert('მოხდა შეცდომა');
      },
    });
  }
}
