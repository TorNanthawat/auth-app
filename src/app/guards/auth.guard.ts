import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    take(1), // รับค่าปัจจุบันของ Observable และยกเลิกการสมัครสมาชิกทันทีหลังจากได้รับค่า
    map(user => {
      if (user) {
        return true; // ผู้ใช้ล็อกอินแล้วให้เข้าถึงเส้นทางได้
      } else {
        // ผู้ใช้ยังไม่ได้ล็อกอิน ให้เปลี่ยนเส้นทางไปที่หน้า Login
        router.navigate(['/login']);
        return false;
      }
    })
  );
};

