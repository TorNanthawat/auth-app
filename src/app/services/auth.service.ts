import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User | null>;

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = this.afAuth.authState;
  }

  async register(
    email: string,
    password: string
  ): Promise<firebase.User | null> {
    const credential = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    return credential.user;
  }

  async login(email: string, password: string): Promise<firebase.User | null> {
    const credential = await this.afAuth.signInWithEmailAndPassword(
      email,
      password
    );
    return credential.user;
  }

  async logout(): Promise<void> {
    await this.afAuth.signOut();
  }

  // ฟังก์ชันสำหรับรีเซ็ตรหัสผ่าน
  resetPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  getUser() {
    return this.afAuth.authState;
  }
}
