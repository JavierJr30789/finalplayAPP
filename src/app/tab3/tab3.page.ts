import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule, IonModal } from '@ionic/angular';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import {Router } from '@angular/router';
import { logIn } from 'ionicons/icons';

@Component({ 
  selector: 'app-tab3', 
  templateUrl: 'tab3.page.html', 
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule],
})
export class Tab3Page implements OnInit {
  @ViewChild('modal', { static: false }) modal!: IonModal;
  formsReg: FormGroup;
  formLog: FormGroup;

  constructor(
    private authService: AuthService,
    private router : Router
  ) {
    this.formsReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });

    this.formLog = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit(): void {}

  //funcion para crear un cuenta en la base de datos de firebase 
  Registro() {
    //llamamos a la funcion de register del servicio auth
    this.authService.register(this.formsReg.value)
    //si sale bien crea el usuario nuevo en la BD
      .then(response => {
         this.router.navigate(['/tabs/tab1'])
        console.log(response);
      })
      // si sale mal es que enviaste datos invalidos (por ejemplo una contraseña de menos de 6 caracteres)
      .catch(error => console.log(error));
    console.log(this.formsReg.value);

  }

  //funcion para validar que las credenciales ingresadas son correctas o que existen en la base de datos
  Logeo(){
    //llamamos a la funcion login del servicio auth
this.authService.Login(this.formLog.value)
//si sale bien devuelve la respuesta de la BD de que te logeaste con exito
.then(response =>{
  
  console.log(response);

})
//si sale mal devuelve la respuesta de la BD de que las credenciales no son validas
.catch(error => console.log(error));
console.log(this.formsReg.value);
  }

  // Método que se llama cuando el modal está por mostrarse
  onWillPresent() {
    document.getElementById('content-background')?.setAttribute('inert', '');
  }

  // Método que se llama cuando el modal está por cerrarse
  onWillDismiss() {
    document.getElementById('content-background')?.removeAttribute('inert');
  }
}