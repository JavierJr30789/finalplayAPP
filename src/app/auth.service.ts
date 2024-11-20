import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {
    // Configurar la persistencia al inicializar el servicio
    setPersistence(this.auth, browserLocalPersistence).catch((error) => {
      console.error('Error al configurar la persistencia:', error);
    });
  }

  register(credentials: { email: string; password: string }) {
    return createUserWithEmailAndPassword(this.auth, credentials.email, credentials.password);
  }

  Login(credentials: { email: string; password: string }) {
    return signInWithEmailAndPassword(this.auth, credentials.email, credentials.password);
  }

  logout() {
    return signOut(this.auth);
  }

  get currentUser() {
    return this.auth.currentUser;
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }
}
