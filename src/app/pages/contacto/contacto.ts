import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.html'
})
export class Contacto {
  // Variables para el Two-Way Data Binding
  nombre: string = '';
  correo: string = '';
  telefono: string = '';
  mensaje: string = '';

  // Control de estado para la interfaz
  formularioEnviado: boolean = false;

  enviarFormulario(): void {
    // Validaciones básicas manuales en TypeScript
    if (!this.nombre || !this.correo || !this.mensaje) {
      alert('Por favor, completa los campos obligatorios (Nombre, Correo y Mensaje).');
      return;
    }

    // Estructura de datos capturada
    const datosContacto = {
      nombre: this.nombre,
      correo: this.correo,
      telefono: this.telefono,
      mensaje: this.mensaje,
      fechaRegistro: new Date()
    };

    console.log('Datos del cliente capturados con éxito:', datosContacto);
    
    // Cambia estado visual y limpiar campos utilizando data binding
    this.formularioEnviado = true;
    this.limpiarCampos();
  }

  limpiarCampos(): void {
    this.nombre = '';
    this.correo = '';
    this.telefono = '';
    this.mensaje = '';
  }
}