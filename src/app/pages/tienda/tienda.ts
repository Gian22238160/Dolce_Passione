import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';    
import { BakeryService } from '../../services/bakery'; 

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './tienda.html'
})
export class Tienda implements OnInit {
  productos: any[] = []; // db.json
  productosFiltrados: any[] = [];
  textoBusqueda: string = '';

  constructor(private bakeryService: BakeryService) {}

  ngOnInit() {
    this.bakeryService.obtenerProductos().subscribe(data => {
      this.productos = data;
      this.productosFiltrados = data;
    });
  }

  // Lógica del Buscador
  filtrar() {
    this.productosFiltrados = this.productos.filter(p => 
      p.nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase())
    );
  }

  // Lógica de Filtro por Categoría
  filtrarPorCategoria(cat: string) {
    if (cat === 'Todas') {
      this.productosFiltrados = this.productos;
    } else {
      this.productosFiltrados = this.productos.filter(p => p.categoria === cat);
    }
  }
}