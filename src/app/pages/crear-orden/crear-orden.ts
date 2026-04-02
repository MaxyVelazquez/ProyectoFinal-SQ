import { Component } from '@angular/core';
import { Orden } from '../../models/orden.model';
import { OrdenService } from '../../services/orden';
import { Router } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-crear-orden',
  standalone: true,
  imports: [Navbar, CommonModule, FormsModule],
  templateUrl: './crear-orden.html',
  styleUrl: './crear-orden.css',
})
export class CrearOrden {
  
}
