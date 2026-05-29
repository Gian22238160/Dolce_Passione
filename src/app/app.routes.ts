import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

//controla el acceso al Dashboard
const authGuard = () => {
  const router = inject(Router);
  
  if (typeof window !== 'undefined' && localStorage.getItem('usuarioLogueado')) {
    return true;
  }
  
  alert('Acceso restringido. Por favor, inicia sesión para ingresar al panel.');
  router.navigate(['/home']);
  return false;
};
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then(c => c.Home)
  },
  {
    path: 'productos',
    loadComponent: () => import('./pages/productos/productos').then(c => c.Productos)
  },
  {
    path: 'ofertas',
    loadComponent: () => import('./pages/ofertas/ofertas').then(c => c.Ofertas)
  },
  {
    path: 'tienda',
    loadComponent: () => import('./pages/tienda/tienda').then(c => c.Tienda)
  },
  {
    path: 'contacto',
    loadComponent: () => import('./pages/contacto/contacto').then(c => c.Contacto)
  },
  {
    path: 'mi-cuenta',
    loadComponent: () => import('./pages/mi-cuenta/mi-cuenta').then(c => c.MiCuenta)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then(c => c.Dashboard),
    canActivate: [authGuard]
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then(c => c.NotFound)
  }];