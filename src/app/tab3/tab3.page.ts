import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule, IonModal } from '@ionic/angular';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../profile.service';  // Importar el servicio de perfil
import { Profile } from '../models/profile';
import { DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
})
export class Tab3Page implements OnInit {
  @ViewChild('modal', { static: false }) modal!: IonModal;
  formsReg: FormGroup;
  formLog: FormGroup;
  isRegister: boolean = true;  // Controla si el modal es para registro o logeo
  showSuccessAlert: boolean = false; // Variable para controlar la visibilidad del mensaje de éxito
  successMessage: string = ''; // Mensaje de éxito
  isAuthenticated: boolean = false;  // Variable para controlar la visibilidad del botón

  // Variables para manejar el error alert
  showErrorAlert: boolean = false; // Controla si se muestra el error
  errorMessage: string = ''; // Mensaje de error

  // Variables para manejar el perfil
  profileForm: FormGroup; // Formulario del perfil
  profile: Profile | null = null; // Datos del perfil

  constructor(
    private authService: AuthService,
    private router: Router,
    private profileService: ProfileService  // Inyectar el servicio de perfil
  ) {
    // Inicialización de formularios de registro y login
    this.formsReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });

    this.formLog = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });

    // Inicializar formulario de perfil
    this.profileForm = new FormGroup({
      displayName: new FormControl(''),
      email: new FormControl(''),
      photoURL: new FormControl(''),
      description: new FormControl(''),
      birthDate: new FormControl(''),
      role: new FormControl(''),
      country: new FormControl(''),
      city: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isLoggedIn();

    setTimeout(() => {
      this.isAuthenticated = this.authService.isLoggedIn();
      console.log(
        this.isAuthenticated
          ? 'Usuario autenticado:'
          : 'No hay usuario autenticado.',
        this.authService.currentUser
      );
      if (this.isAuthenticated) {
        this.loadUserProfile();
      }
    }, 500);
  }

  loadUserProfile() {
    const userId = this.authService.currentUser?.uid;
    if (userId) {
      this.profileService.getProfile(userId).subscribe((profileData: DocumentData | undefined) => {
        if (profileData) {
          // Si profileData no es undefined, lo asignamos al perfil
          this.profile = profileData as Profile; // Hacemos un cast de DocumentData a Profile
          this.profileForm.patchValue(profileData);  // Cargar los datos en el formulario
        } else {
          console.log('Perfil no encontrado');
        }
      });
    }
  }
  // Función para mostrar el mensaje de éxito
  showSuccess(message: string) {
    this.successMessage = message;
    this.showSuccessAlert = true;
    setTimeout(() => this.closeSuccessAlert(), 3000); // Cierra el mensaje después de 5 segundos
  }

  // Función para cerrar el mensaje de éxito
  closeSuccessAlert() {
    this.showSuccessAlert = false;
  }

  // Función para mostrar el alert de error
  showError(message: string) {
    this.errorMessage = message;
    this.showErrorAlert = true;
    setTimeout(() => this.closeErrorAlert(), 5000); // Cierra el mensaje después de 5 segundos
  }

  // Función para cerrar el alert de error
  closeErrorAlert() {
    this.showErrorAlert = false;
  }

  // Función para crear una cuenta en la base de datos de Firebase
  Registro() {
    this.authService.register(this.formsReg.value)
      .then(response => { 
        this.showSuccess('Registrado con exito!'); // Mostrar mensaje de éxito al registrarse
        this.isAuthenticated = true;  // Cambiar a true cuando el logeo es exitoso
        console.log('Registrado con exito',response);
        this.modal.dismiss(); // Cerrar el modal después de un registro exitoso
      })
      .catch(error =>{ 
        this.showError('Error al registrarse'); // Muestra el mensaje de error
        console.log('ERROR AL REGISTRARSE',error)});
    console.log(this.formsReg.value);
  }

  // Función para validar las credenciales y logearse
  Logeo() {
    this.authService.Login(this.formLog.value)
      .then(response => {
        this.showSuccess('Logeado con exito!'); // Mostrar mensaje de éxito al logearse
        this.isAuthenticated = true;  // Cambiar a true cuando el logeo es exitoso
        console.log('Logeado con exito',response);
        this.modal.dismiss(); // Cerrar el modal después de un logeo exitoso
      })
      .catch(error => {
        this.showError('Error al Logearse'); // Muestra el mensaje de error
        console.log('Error al logearse',error)});
    console.log(this.formLog.value);
  }

  // Función para alternar entre registro y logeo
  toggleForm() {
    this.isRegister = !this.isRegister;  // Cambia entre registro y logeo
  }

  // Función para guardar los datos del perfil
  saveProfile() {
    if (this.profileForm.valid) {
      const profileData: Profile = this.profileForm.value;
      this.profileService.saveProfile(profileData).then(() => {
        this.showSuccess('Perfil actualizado con éxito');
      }).catch((error) => {
        this.showError('Error al actualizar el perfil');
        console.error(error);
      });
    }
  }

  // Función para eliminar el perfil
  deleteProfile() {
    this.profileService.deleteProfile().then(() => {
      this.showSuccess('Perfil eliminado');
      this.router.navigate(['/tabs/tab1']); // Redirigir a la primera pestaña después de eliminar el perfil
    }).catch((error) => {
      this.showError('Error al eliminar el perfil');
      console.error(error);
    });
  }

  // Método que se llama cuando el modal está por mostrarse
  onWillPresent() {
    document.getElementById('content-background')?.setAttribute('inert', '');
  }

  // Método que se llama cuando el modal está por cerrarse
  onWillDismiss() {
    document.getElementById('content-background')?.removeAttribute('inert');
  }

  // Función para abrir el modal y determinar el estado (registro o logeo)
  openModal(formType: string) {
    this.isRegister = formType === 'register';
    this.modal.present(); // Abre el modal
  }

  logout() {
    this.authService.logout()
      .then(() => {
        this.isAuthenticated = false;
        console.log('Sesión cerrada.');
      })
      .catch(error => console.error('Error al cerrar sesión:', error));
  }
}
