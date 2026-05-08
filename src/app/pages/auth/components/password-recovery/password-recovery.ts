import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-password-recovery',
  imports: [FormsModule, RouterLink],
  templateUrl: './password-recovery.html',
  styleUrl: '../sign-in/sign-in.css',
})
export class PasswordRecovery {
  private http = inject(HttpClient);
  private notification = inject(NotificationService);
  email: string = '';

  onSubmit() {
    this.http
      .post('https://api.everrest.educata.dev/auth/recovery', { email: this.email })
      .subscribe({
        next: (data: any) => {
          this.notification.success(data.message);
        },
        error: () => {
          this.notification.error('Could not send recovery email');
        },
      });
  }
}
