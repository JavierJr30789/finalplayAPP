import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { Torneo, Equipo, Partido } from '../models/torneo';
import { FirestoreService } from '../firestore.service';
import { IonicModule } from '@ionic/angular'; 
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common'; 
import { CrearTorneoModalComponent } from '../crear-torneo-modal/crear-torneo-modal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule] 
})

export class Tab2Page {
  nuevoTorneo: Torneo = {
    nombre: '',
    descripcion: '',
    fotoTorneoUrl: '',
    cantidadEP: 0,
    equipos: [],
    fixture: []
  };

  torneos$: Observable<Torneo[]>;

  constructor(private firestoreService: FirestoreService, private modalController: ModalController) {
    this.torneos$ = this.firestoreService.obtenerTorneos(); 
  }

  // Método para abrir el modal de crear torneo
  async abrirModal() {
    const modal = await this.modalController.create({
      component: CrearTorneoModalComponent,
      componentProps: {
        nuevoTorneo: this.nuevoTorneo
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result && result.data) {
        console.log('Datos recibidos:', result.data);
        this.generarFixture(result.data.equipos);
        result.data.fixture = this.nuevoTorneo.fixture; // Asignar fixture generado
        this.firestoreService.crearTorneo(result.data).then(() => {
          console.log('Torneo creado con éxito');
        }).catch((error) => {
          console.error('Error al crear torneo:', error);
        });
      } else {
        console.warn('No se recibieron datos del modal');
      }
    });

    await modal.present();
  }

  // Método para agregar un equipo al torneo
  agregarEquipo() {
    if (this.nuevoTorneo && this.nuevoTorneo.equipos && this.nuevoTorneo.equipos.length < this.nuevoTorneo.cantidadEP) {
      this.nuevoTorneo.equipos.push({
        nombre: '',  
        fotoEquipoUrl: ''  
      });
    } else {
      alert('El número máximo de equipos es ' + this.nuevoTorneo.cantidadEP);
    }
  }

  // Método para eliminar un equipo
  eliminarEquipo(index: number) {
    if (this.nuevoTorneo && this.nuevoTorneo.equipos && this.nuevoTorneo.equipos.length > 0) {
      this.nuevoTorneo.equipos.splice(index, 1);
    }
  }

  // Método para generar el fixture de partidos en una estructura aplanada
  generarFixture(equipos: Equipo[]) {
    const fixture: Partido[] = [];
    
    for (let i = 0; i < equipos.length; i += 2) {
      if (i + 1 < equipos.length) {
        fixture.push({
          equipo1: equipos[i].nombre,
          equipo2: equipos[i + 1].nombre,
          equipo1FotoUrl: equipos[i].fotoEquipoUrl, // Asignar foto del equipo 1
          equipo2FotoUrl: equipos[i + 1].fotoEquipoUrl, // Asignar foto del equipo 2
          resultado: ''
        });
      }
    }
    
    this.nuevoTorneo.fixture = fixture;
    console.log('Fixture generado:', fixture);
  }
  
}