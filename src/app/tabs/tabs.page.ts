import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule
import { AuthService } from '../auth.service'; // Importa el servicio de autenticación

import { addIcons } from 'ionicons';
import { triangle, ellipse, square } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],  // Asegúrate de que CommonModule esté aquí
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);
  isAuthenticated: boolean = false; // Agrega la propiedad isAuthenticated

  constructor(private authService: AuthService) {
    addIcons({ triangle, ellipse, square });
  }

  ngOnInit() {
    this.isAuthenticated = this.authService.isLoggedIn(); // Verifica si el usuario está autenticado
  }

  logout() {
    this.authService.logout()
      .then(() => {
        this.isAuthenticated = false; // Actualiza el estado de autenticación después de cerrar sesión
        console.log('Sesión cerrada');
      })
      .catch(error => {
        console.error('Error al cerrar sesión:', error);
      });
  }
}
