import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { Navbar } from '../../components/navbar/navbar';
import { CommonModule } from '@angular/common';
import { OrdenService } from '../../services/orden';
import { Orden } from '../../models/orden.model';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [CommonModule, Navbar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  ordenes: Orden[] = [];
  ordenActual: Orden | undefined;

  constructor(private auth: AuthService, private router: Router, private ordenService: OrdenService) {}

  ngOnInit() {
    this.ordenActual = this.ordenService.getOrdenActual();
  }

  crearOrden(){
    this.router.navigate(['/crear-orden']);
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
