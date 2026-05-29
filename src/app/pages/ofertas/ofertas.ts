import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Producto {
  id: string;
  nombre: string;
  imagen: string;
  categoria: string;
  precio: number;
  stock: number;
  // Propiedades calculadas para la oferta
  precioOferta?: number;
  descuento?: number;
}

@Component({
  selector: 'app-ofertas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ofertas.html'
})
export class Ofertas implements OnInit {
  private apiUrl = 'http://localhost:3000/productos';
  
  listaOfertas: Producto[] = [];
  ofertasFiltradas: Producto[] = [];
  categoriaActiva: string = 'todas';

  // Definimos los descuentos oficiales por categoría
  private descuentos: { [key: string]: number } = {
    'Tortas Finas': 0.15,      // 15% de descuento
    'Cheesecakes': 0.20,      // 20% de descuento
    'Porciones Por Día': 0.10 // 10% de descuento
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarOfertas();
  }

  cargarOfertas(): void {
    this.http.get<Producto[]>(this.apiUrl).subscribe({
      next: (data) => {
        // Procesar los productos agregándoles su descuento
        this.listaOfertas = data.map(producto => {
          const tasaDescuento = this.descuentos[producto.categoria] || 0;
          return {
            ...producto,
            descuento: tasaDescuento * 100,
            precioOferta: producto.precio * (1 - tasaDescuento)
          };
        });
        this.ofertasFiltradas = [...this.listaOfertas];
      },
      error: (err) => console.error('Error al cargar ofertas:', err)
    });
  }

  // Filtra las ofertas al cambiar de pestaña
  filtrarPorCategoria(categoria: string): void {
    this.categoriaActiva = categoria;
    if (categoria === 'todas') {
      this.ofertasFiltradas = [...this.listaOfertas];
    } else {
      this.ofertasFiltradas = this.listaOfertas.filter(p => p.categoria === categoria);
    }
  }
}