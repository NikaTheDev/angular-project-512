import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-password-recovery',
  imports: [FormsModule, RouterLink],
  templateUrl: './password-recovery.html',
  styleUrl: '../sign-in/sign-in.css',
})
export class PasswordRecovery {
  private http = inject(HttpClient);
  email: string = '';

  successMessage = signal('');
  errorMessage = signal('');

  onSubmit() {
    console.log(this.email);

    this.http
      .post('https://api.everrest.educata.dev/auth/recovery', { email: this.email })
      .subscribe({
        next: (data: any) => {
               this.errorMessage.set('');
          this.successMessage.set(data.message);
        },
        error: () => {
         this.successMessage.set('');
          this.errorMessage.set('Could not send recovery email');
        },
      });
  }
}
