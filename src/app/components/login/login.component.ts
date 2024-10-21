import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  async onLogin() {
    if (!this.validateEmail(this.email)) {
      this.errorMessage = 'รูปแบบอีเมลไม่ถูกต้อง';
      return;
    }

    console.log('Attempting login with email:', this.email);
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/']);
    } catch (error: any) {
      console.error("Error during login:", error);
      this.errorMessage = this.getErrorMessage(error);
    }
  }

  validateEmail(email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  }

  getErrorMessage(error: any): string {
    switch (error.code) {
      case 'auth/invalid-email':
        return 'อีเมลไม่ถูกต้อง กรุณาใส่อีเมลที่ถูกต้อง';
      case 'auth/user-not-found':
        return 'ไม่พบผู้ใช้งานที่มีอีเมลนี้';
      case 'auth/wrong-password':
        return 'รหัสผ่านไม่ถูกต้อง';
      default:
        return 'อีเมลหรือรหัสผ่านไม่ถูกต้อง';
    }
  }

  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}
