import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, docData, deleteDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Profile } from './models/profile';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private firestore: Firestore = inject(Firestore); // Inyecta Firestore

  constructor(private authService: AuthService) {}

  // Crear o actualizar el perfil
  saveProfile(profileData: Profile): Promise<void> {
    const userId = this.authService.currentUser?.uid;
    if (!userId) {
      throw new Error('Usuario no autenticado');
    }

    const profileRef = doc(this.firestore, `profiles/${userId}`);
    return setDoc(profileRef, profileData); // Guardar o actualizar el documento en Firestore
  }

  // Obtener el perfil
  getProfile(userId: string) {
    const profileRef = doc(this.firestore, `profiles/${userId}`);
    return docData(profileRef); // Devuelve un Observable con los datos del perfil
  }

  // Eliminar el perfil
  deleteProfile(): Promise<void> {
    const userId = this.authService.currentUser?.uid;
    if (!userId) {
      throw new Error('Usuario no autenticado');
    }

    const profileRef = doc(this.firestore, `profiles/${userId}`);
    return deleteDoc(profileRef); // Eliminar el documento del perfil
  }
}
