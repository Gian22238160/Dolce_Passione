import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


interface Producto {
  id: string;
  nombre: string;
  imagen: string;
  categoria: string;
  precio: number;
  stock: number;
}

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.html'
})
export class Productos implements OnInit {
  private apiUrl = 'http://localhost:3000/productos';

  // Listas de datos
  listaProductos: Producto[] = [];
  productosFiltrados: Producto[] = [];

  // Variables de filtrado enlazadas al HTML con ngModel
  textoBusqueda: string = '';
  categoriaSeleccionada: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.http.get<Producto[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.listaProductos = data;
        this.productosFiltrados = data;
      },
      error: (err) => {
        console.error('Error conectando a JSON Server:', err);
      }
    });
  }

  //filtro dinámico combinando buscador y selector de categorías
  filtrarProductos(): void {
    this.productosFiltrados = this.listaProductos.filter(producto => {
      const coincideTexto = producto.nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase());
      const coincideCategoria = this.categoriaSeleccionada === '' || producto.categoria === this.categoriaSeleccionada;
      return coincideTexto && coincideCategoria;
    });
  }
}