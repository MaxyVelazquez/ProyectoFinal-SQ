import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventarioSQ } from '../../services/inventario-sq';
import { Navbar } from '../../components/navbar/navbar';
import { ModalInventario } from "../../components/modal-inventario/modal-inventario";

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, Navbar, ModalInventario],
  templateUrl: './inventario.html',
  styleUrl: './inventario.css',
})
export class Inventario implements OnInit {

  cantQuesadillas: number = 0;
  cantNugets: number = 0;

  mostrarModal = false;
  productoSeleccionado = '';

  constructor(private inventarioService: InventarioSQ) {}

  ngOnInit() {
    this.cantQuesadillas = this.inventarioService.getProducto(1)?.cantidad ?? 0;
    this.cantNugets = this.inventarioService.getProducto(2)?.cantidad ?? 0;  
  }

  abrirModal(producto: string){
    this.productoSeleccionado = producto;
    this.mostrarModal = true;
  }

  procesarCantidad(cantidad: number){
    if(this.productoSeleccionado === 'Quesadilla'){
      this.cantQuesadillas += cantidad;
      this.inventarioService.setCantidad(1, this.cantQuesadillas);
    }
    else{
      this.cantNugets += cantidad;
      this.inventarioService.setCantidad(2, this.cantNugets);
    }
    this.mostrarModal = false;
  }

}
