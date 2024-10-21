import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  message: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  async onResetPassword() {
    try {
      await this.authService.resetPassword(this.email);
      this.message = 'ลิงก์รีเซ็ตรหัสผ่านได้ถูกส่งไปยังอีเมลของคุณแล้ว';
      this.errorMessage = '';
    } catch (error: any) {
      this.message = '';
      this.errorMessage = 'เกิดข้อผิดพลาดในการส่งอีเมล กรุณาลองใหม่อีกครั้ง';
    }
  }
}