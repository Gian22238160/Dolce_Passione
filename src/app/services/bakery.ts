import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  id: number;
  nombre: string;
  imagen: string;
  categoria: string;
  precio: number;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class BakeryService {
  private apiUrl = 'http://localhost:3000/productos';

  constructor(private http: HttpClient) {}

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  guardarSesion(usuario: any): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
    }
  }

  obtenerSesion(): any {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('usuarioLogueado');
      return data ? JSON.parse(data) : null;
    }
    return null;
  }

  destruirSesion(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('usuarioLogueado');
    }
  }

  estaLogueado(): boolean {
    return this.obtenerSesion() !== null;
  }
}