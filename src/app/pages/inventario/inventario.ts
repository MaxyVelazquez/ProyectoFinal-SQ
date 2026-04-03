import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventarioSQ } from '../../services/inventario-sq';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, Navbar],
  templateUrl: './inventario.html',
  styleUrl: './inventario.css',
})
export class Inventario implements OnInit {

  cantQuesadillas: number = 0;
  cantNugets: number = 0;

  constructor(private inventarioService: InventarioSQ) {}

  ngOnInit() {
    console.log('Inventario cargado');
    this.cantQuesadillas = this.inventarioService.getQuesadillas();
    this.cantNugets = this.inventarioService.getNugets();   
  }

  agregarQuesadilla() {
    this.cantQuesadillas++;
    this.inventarioService.setQuesadillas(this.cantQuesadillas);
  }

  agregarNuget() {
    this.cantNugets++;
    this.inventarioService.setNugets(this.cantNugets);
  }

}
