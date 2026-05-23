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
import { InventarioSQ } from '../../services/inventario-sq';
import { Ventas } from '../../services/ventas';

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

  constructor(private auth: AuthService, private router: Router, private ordenService: OrdenService, public inventarioService: InventarioSQ, private ventasService: Ventas) {}

  ngOnInit() {
    this.ordenes=this.ordenService.getOrdenes();
    this.sub = this.ordenService.getOrdenActual$().subscribe(orden => {
      this.ordenActual = orden;
      this.ordenes=this.ordenService.getOrdenes();
    });
    console.log(this.ordenes);
  }

  mostrarPagoExitoso: boolean = false;

  seleccionarOrden(orden:Orden){
    this.ordenActual = orden;
  }

  editarOrden(orden:Orden){
    if(this.ordenActual){
      this.ordenService.saveOrdenEditar(orden.id);

      //Aqui vamos a agregar las quesadillas y nuggets de nuevo al inventario, para que al editar la orden, se pueda modificar la cantidad de quesadillas y nuggets sin que se reste del inventario actual
      //this.inventarioService.setQuesadillas(this.inventarioService.getQuesadillas() + orden.quesadillas);
      this.inventarioService.setCantidad(1, this.inventarioService.getCantidad(1) + orden.quesadillas);

      //this.inventarioService.setNugets(this.inventarioService.getNugets() + orden.nuggets);
      this.inventarioService.setCantidad(2, this.inventarioService.getCantidad(2) + orden.nuggets);

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
      this.ordenes=this.ordenService.getOrdenes();
      this.ordenActual=this.ordenes.length > 0 ? this.ordenes[0] : undefined;
      this.cancelar=false;
      this.admin='';
      this.password='';
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

      const quesadilla = this.inventarioService.getProducto(1);
      const nugget = this.inventarioService.getProducto(2);

      this.ventasService.registrarVenta(this.ordenActual.total, [
        { productoId: 1, cantidad: this.ordenActual.quesadillas, precioUnitario: quesadilla?.precio ?? 0 },
        { productoId: 2, cantidad: this.ordenActual.nuggets, precioUnitario: nugget?.precio ?? 0 }
      ]);

        this.ordenService.pushOrdenPagada(this.ordenActual!);
        this.ordenService.eliminarOrden(this.ordenActual.id);
        this.ordenes = this.ordenService.getOrdenes();
        this.ordenActual = this.ordenes.length > 0 ? this.ordenes[0] : undefined;


        this.mostrarPagar=false;
        this.pagoCliente=undefined;
        this.cambio=0;

        this.ordenes=this.ordenService.getOrdenes();
        this.mostrarPagoExitoso = true;
      
    }

  }

  cerrarPagoExitoso() {
    this.mostrarPagoExitoso = false;
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
