import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { Navbar } from '../../components/navbar/navbar';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { InventarioSQ } from '../../services/inventario-sq';

@Component({
  selector: 'app-productos',
  imports: [Navbar, CommonModule, FormsModule],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class Productos implements OnInit{
  productos:any[] = [];
  menuAbierto:number | null = null;
  mostrarModal:boolean = false;
  productoSeleccionado:any | null = null;
  nuevoProducto:string = '';
  nuevoPrecio:number | null = null;
  nuevaCantidad:number | null = null;
  menuPosicion = { top: 0, left: 0 };
  constructor(private auth: AuthService, private router: Router, public inventarioService: InventarioSQ) {}
  ngOnInit(): void {
    this.getProductos();
  }

 toggleMenu(id: number, event: MouseEvent) {
  const btn = event.target as HTMLElement;
  const rect = btn.getBoundingClientRect();
  this.menuPosicion = {
    top: rect.bottom + 4,
    left: rect.left - 100
  };
  this.menuAbierto = this.menuAbierto === id ? null : id;
}

  abrirModalCrear(){
    this.productoSeleccionado = null;
    this.nuevoProducto = '';
    this.nuevoPrecio = null;
    this.nuevaCantidad = null;
    this.mostrarModal = true;
  }

  mostrarEditar(producto:any){
    this.productoSeleccionado = producto;
    this.mostrarModal = true;
  }

  borrarProducto(producto:any){
    this.inventarioService.deleteProducto(producto.id);
    this.getProductos();
  }

  editarProducto(){
    if(this.productoSeleccionado && this.productoSeleccionado.nombre && this.productoSeleccionado.precio && this.productoSeleccionado.cantidad){
      this.inventarioService.actualizarProducto(this.productoSeleccionado.id, {precio: this.productoSeleccionado.precio, cantidad: this.productoSeleccionado.cantidad});
      this.getProductos();
      this.mostrarModal = false;
    }
  }

  crearProducto(){
    if(this.nuevoProducto && this.nuevoPrecio !== null && this.nuevaCantidad !== null){
      this.inventarioService.agregarProducto(this.nuevoProducto, this.nuevoPrecio, this.nuevaCantidad);
      this.getProductos();
      this.mostrarModal = false;
    }
  }

  getProductos(){
    this.productos = this.inventarioService.getProductos();
  }
}
