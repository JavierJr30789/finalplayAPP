import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule, IonModal } from '@ionic/angular';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

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

  constructor(private authService: AuthService) {
    this.formsReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.authService.register(this.formsReg.value)
      .then(response => {
        console.log(response);
      })
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