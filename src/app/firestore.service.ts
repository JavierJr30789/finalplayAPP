import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importa AngularFirestore
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) {}

  // Función para guardar un torneo en Firestore
  crearTorneo(torneo: any): Promise<any> {
    return this.firestore.collection('torneos').add(torneo);
  }

  // Función para obtener todos los torneos
  obtenerTorneos(): Observable<any[]> {
    return this.firestore.collection('torneos').valueChanges();
  }

  // Función para obtener un torneo por ID
  obtenerTorneoPorId(id: string): Observable<any> {
    return this.firestore.collection('torneos').doc(id).valueChanges();
  }

  // Función para actualizar un torneo por ID
  actualizarTorneo(id: string, torneo: any): Promise<void> {
    return this.firestore.collection('torneos').doc(id).update(torneo);
  }

  // Función para eliminar un torneo por ID
  eliminarTorneo(id: string): Promise<void> {
    return this.firestore.collection('torneos').doc(id).delete();
  }
}
