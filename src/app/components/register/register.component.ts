import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onRegister() {
    // ตรวจสอบรูปแบบอีเมลก่อน
    if (!this.validateEmail(this.email)) {
      this.errorMessage = 'รูปแบบอีเมลไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง';
      return;
    }

    // ตรวจสอบว่ารหัสผ่านตรงกัน
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'รหัสผ่านไม่ตรงกัน';
      return;
    }

    // ตรวจสอบความยาวของรหัสผ่าน (ตัวอย่าง: อย่างน้อย 6 ตัวอักษร)
    if (this.password.length < 6) {
      this.errorMessage = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร';
      return;
    }

    console.log('Attempting to register with email:', this.email);
    try {
      await this.authService.register(this.email, this.password);
      this.router.navigate(['/']); // เปลี่ยนเส้นทางไปยังหน้า Home หลังจากสมัครสำเร็จ
      // รีเซ็ตฟอร์ม
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
    } catch (error: any) {
      console.error('Error during registration:', error);
      this.errorMessage = this.getErrorMessage(error);
    }
  }

  validateEmail(email: string): boolean {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  }

  getErrorMessage(error: any): string {
    switch (error.code) {
      case 'auth/invalid-email':
        return 'อีเมลไม่ถูกต้อง กรุณาใส่อีเมลที่ถูกต้อง';
      case 'auth/email-already-in-use':
        return 'อีเมลนี้ถูกใช้งานแล้ว กรุณาใช้อีเมลอื่น';
      case 'auth/weak-password':
        return 'รหัสผ่านอ่อนแอ กรุณาใช้รหัสผ่านที่แข็งแรงขึ้น';
      default:
        return 'เกิดข้อผิดพลาดในการสมัครสมาชิก โปรดลองใหม่อีกครั้ง';
    }
  }
}
