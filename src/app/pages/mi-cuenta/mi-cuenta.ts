import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BakeryService } from '../../services/bakery';

@Component({
  selector: 'app-mi-cuenta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mi-cuenta.html'
})
export class MiCuenta {
  emailInput: string = 'meyder2003@gmail.com';
  passwordInput: string = '123456';

  constructor(private bakeryService: BakeryService, private router: Router) {}

  ejecutarLoginSimulado() {
    if (!this.emailInput.includes('@') || this.passwordInput.length < 6) {
      alert('Por favor, ingresa un correo electrónico válido y una contraseña de mínimo 6 caracteres.');
      return;
    }

    const payloadUsuario = {
      correo: this.emailInput,
      nombreAdministrador: 'Usuario Dolce',
      fechaConexion: new Date()
    };

    this.bakeryService.guardarSesion(payloadUsuario);
    alert('Autenticación correcta. Bienvenido al Dashboard.');
    this.router.navigate(['/dashboard']);
  }
}