import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  userData = signal<any>(null);

  private http = inject(HttpClient);
  private router = inject(Router);

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const token = localStorage.getItem('access_token');

    this.http
      .get('https://api.everrest.educata.dev/auth', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .subscribe({
        next: (data) => {
          this.userData.set(data);
        },
      });
  }
  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
}
