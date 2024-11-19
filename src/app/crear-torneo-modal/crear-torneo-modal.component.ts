import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Torneo, Equipo } from '../models/torneo';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Importa CommonModule

@Component({
  selector: 'app-crear-torneo-modal',
  templateUrl: './crear-torneo-modal.component.html',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],  // Agrega CommonModule aquí
})
export class CrearTorneoModalComponent implements OnChanges {
  @Input() nuevoTorneo: Torneo = {
    nombre: '',
    descripcion: '',
    fotoTorneoUrl: '',
    cantidadEP: 4,
    equipos: []
  };

  @Output() torneoCreado: EventEmitter<Torneo> = new EventEmitter<Torneo>();

  equipos: Equipo[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['nuevoTorneo'] && changes['nuevoTorneo'].currentValue.cantidadEP) {
      this.actualizarEquipos();
    }
  }

  actualizarEquipos() {
    const cantidadEquipos = this.nuevoTorneo.cantidadEP;

    // Ajustar el tamaño de la lista de equipos según la cantidad seleccionada
    while (this.equipos.length < cantidadEquipos) {
      this.equipos.push({ nombre: '', fotoEquipoUrl: '' });
    }
    while (this.equipos.length > cantidadEquipos) {
      this.equipos.pop();
    }
  }

  crearTorneo() {
    this.nuevoTorneo.equipos = this.equipos.map(e => ({ ...e })); // Copia cada equipo
    this.modalController.dismiss(this.nuevoTorneo); // Pasa los datos del torneo al cerrar el modal
  }
  
  

  cerrarModal() {
    this.modalController.dismiss();
  }

  constructor(private modalController: ModalController) {}
}