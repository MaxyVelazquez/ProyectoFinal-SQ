import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { Navbar } from '../../components/navbar/navbar';
import { CommonModule } from '@angular/common';
import { OrdenService } from '../../services/orden';
import { Orden } from '../../models/orden.model';
import { Subscription } from 'rxjs';
import { CrearOrden } from '../crear-orden/crear-orden';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [CommonModule, Navbar, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  private sub:Subscription | undefined;
  ordenes: Orden[] = [];
  ordenActual: Orden | undefined;
  modificarOrden:CrearOrden | undefined;
  cancelar:boolean=false;
  admin:string='';
  password:string='';
  mostrarPagar:boolean=false;
  pagoCliente:number | undefined;
  cambio:number=0;

  constructor(private auth: AuthService, private router: Router, private ordenService: OrdenService) {}

  ngOnInit() {
    this.ordenes=this.ordenService.getOrdenes();
    this.sub = this.ordenService.getOrdenActual$().subscribe(orden => {
      this.ordenActual = orden;
      this.ordenes=this.ordenService.getOrdenes();
    });
    console.log(this.ordenes);
  }

  seleccionarOrden(orden:Orden){
    this.ordenActual = orden;
  }

  editarOrden(orden:Orden){
    if(this.ordenActual){
      this.ordenService.saveOrdenEditar(orden.id);
      
      this.router.navigate(['/crear-orden']);
      
    }
    
  }
  confirmareliminarOrden(){
    this.cancelar=true;
    
  }

  eliminarOrden(orden:Orden){
    if(this.auth.login(this.admin, this.password)){
      if(this.ordenActual){
      this.ordenService.eliminarOrden(orden.id);
      this.ordenActual=undefined;
    }
    }
    
  }

  pagarOrden(){
    this.mostrarPagar=true;
  }

  calcularCambio(){
    if(this.ordenActual && this.pagoCliente){
      this.cambio = this.pagoCliente - this.ordenActual.total;
    }
  }

  funcionCerrar(){
    this.mostrarPagar=false;
    this.pagoCliente=undefined;
    this.cambio=0;
  }

  funcionPagar(){
    if(this.ordenActual && this.pagoCliente!==undefined && this.cambio >= 0){
      this.ordenService.pushOrdenPagada(this.ordenActual!);
      this.ordenService.eliminarOrden(this.ordenActual.id);
      alert(`¡Dino-Pago Exitoso!\nLa Orden ha sido procesada correctamente.`);
      this.ordenActual=undefined;
      this.mostrarPagar=false;
      this.pagoCliente=undefined;
      this.cambio=0;

      this.ordenes=this.ordenService.getOrdenes();
      
    }

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.sub?.unsubscribe();
  }

  crearOrden(){
    this.router.navigate(['/crear-orden']);
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
