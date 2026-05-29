import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // 1. Importa RouterLink

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {}