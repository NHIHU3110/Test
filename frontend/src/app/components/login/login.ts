import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username = '';
  password = '';
  type = 'customer';
  errorMessage = '';

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) { }

  onLogin() {
    if (!this.username || !this.password) return;

    this.apiService.login({ username: this.username, password: this.password, type: this.type })
      .subscribe({
        next: (res) => {
          if (res.success) {
            const userObj = { ...res.user, role: res.type };
            this.authService.login(userObj);
            this.router.navigate(['/']);
          }
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Login failed';
        }
      });
  }
}
