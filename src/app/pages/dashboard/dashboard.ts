import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BakeryService } from '../../services/bakery';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit {
  usuarioActual: any = null;

  constructor(private bakeryService: BakeryService, private router: Router) {}

  ngOnInit(): void {
    this.usuarioActual = this.bakeryService.obtenerSesion();
  }

  cerrarSesion(): void {
    this.bakeryService.destruirSesion();
    alert('Sesión destruida de forma segura.');
    this.router.navigate(['/home']);
  }
}