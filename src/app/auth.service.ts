import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged, signOut,  User, setPersistence, browserLocalPersistence} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User | null = null; // Variable para almacenar el usuario actual
  constructor(private auth: Auth) { 
    // Configurar la persistencia
    setPersistence(this.auth, browserLocalPersistence)
      .then(() => {
        console.log('Persistencia configurada correctamente');
      })
      .catch((error) => {
        console.error('Error al configurar la persistencia:', error);
      });

    this.monitorAuthState();
  }
private monitorAuthState() {
  onAuthStateChanged(this.auth, (user) => {
    this.currentUser = user;
  });
}


  register({email, password}: any){
    return createUserWithEmailAndPassword(this.auth, email, password)
  }

Login({email, password}: any){
  return signInWithEmailAndPassword(this.auth, email, password);
}

// Cierre de sesión
logout() {
  return signOut(this.auth);
}

// Obtener el estado de autenticación
isLoggedIn(): boolean {
  return this.currentUser !== null;
}
}