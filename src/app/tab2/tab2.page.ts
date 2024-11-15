import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { Torneo } from '../models/torneo';
import { FirestoreService } from '../firestore.service';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs'; // Para manejar los datos de Firestore
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class Tab2Page {
  // Definir el objeto nuevoTorneo con los campos vacíos inicialmente
  nuevoTorneo: Torneo = {
    nombre: '',
    descripcion: '',
    fotoTorneoUrl: '',
    cantidadEP: 0,
    equipos: []
  };

  // Lista para almacenar los torneos obtenidos de Firestore
  torneos$: Observable<Torneo[]>;

  constructor(private firestoreService: FirestoreService) {
    // Obtener los torneos desde Firestore al iniciar el componente
    this.torneos$ = this.firestoreService.obtenerTorneos();
  }

  // Función para crear un nuevo torneo
  crearTorneo() {
    // Llamar al servicio para crear el torneo en Firestore
    this.firestoreService.crearTorneo(this.nuevoTorneo).then(() => {
      console.log('Torneo creado con éxito');
      // Limpiar el formulario después de crear el torneo
      this.nuevoTorneo = {
        nombre: '',
        descripcion: '',
        fotoTorneoUrl: '',
        cantidadEP: 0,
        equipos: []
      };
    }).catch((error) => {
      console.error('Error al crear torneo:', error);
    });
  }
}



