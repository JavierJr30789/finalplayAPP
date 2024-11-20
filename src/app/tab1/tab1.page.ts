import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Torneo } from '../models/torneo';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common'; // Asegúrate de importar esto

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule] // Agrega CommonModule aquí
})
export class Tab1Page implements OnInit {
  torneos: Torneo[] = []; // Lista para almacenar los torneos

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.cargarTorneos();
  }

  cargarTorneos() {
    this.firestoreService.obtenerTorneos().subscribe({
      next: (data) => {
        this.torneos = data; // Asigna los datos obtenidos a la lista local
      },
      error: (err) => {
        console.error('Error al obtener torneos:', err);
      },
    });
  }
}
