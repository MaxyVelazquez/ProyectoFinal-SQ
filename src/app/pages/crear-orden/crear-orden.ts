import { Component } from '@angular/core';
import { Orden } from '../../models/orden.model';
import { OrdenService } from '../../services/orden';
import { Router } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { InventarioSQ } from '../../services/inventario-sq';

@Component({
  selector: 'app-crear-orden',
  standalone: true,
  imports: [Navbar, CommonModule, FormsModule],
  templateUrl: './crear-orden.html',
  styleUrl: './crear-orden.css',
})
export class CrearOrden {
  quesadillas: number = 0;
  nuggets: number = 0;
  mostrarFormQuesadillas: boolean = false;
  mostrarFormNuggets: boolean = false;
  cantidadQ:number=0;
  cantidadN:number=0;
  mostrarConfirmacion: boolean = false;
  admin:string='';
  password:string='';
  errorMSG:string='';
  mostrarError: boolean = false;
  editar:boolean=false;
  ordenId:number=0;
  OrdenAux:Orden | undefined;
  ordenEditar:Orden | undefined;
  mostrarErrorQ: boolean = false;
  mostrarErrorN: boolean = false;

  constructor(private ordenService: OrdenService, private router: Router, private authService: AuthService, public inventarioService: InventarioSQ) {
    
  }

  ngOnInit() {
    
    const ordenEditarId = this.ordenService.getordenEditar();
    if(ordenEditarId){
       this.ordenEditar= this.ordenService.getOrdenById(ordenEditarId!);
    }
    
    if(this.ordenEditar){
      this.editar=true;
      this.quesadillas =this.ordenEditar.quesadillas;
      this.nuggets = this.ordenEditar.nuggets;
      this.cantidadQ=this.ordenEditar.quesadillas;
      this.cantidadN=this.ordenEditar.nuggets;
    }
  }

  agregarQuesadilla():void{
    this.mostrarFormQuesadillas = true;
  }

  validarQuesadillas():void{
    if(Number(this.cantidadQ) > this.inventarioService.getCantidad(1)){
    this.mostrarErrorQ = true;
      this.cantidadQ = this.inventarioService.getCantidad(1);
      const input = document.getElementById('cantQ') as HTMLInputElement;
      if(input) input.value = this.cantidadQ.toString();
    }
  }

  agregarNuggets():void{
    this.mostrarFormNuggets = true;
  }

  validarNuggets():void{
    if(Number(this.cantidadN) > this.inventarioService.getCantidad(2)){
      this.mostrarErrorN = true;
      this.cantidadN = this.inventarioService.getCantidad(2);
      const input = document.getElementById('cantN') as HTMLInputElement;
      if(input) input.value = this.cantidadN.toString();
      }
  }

  confirmarQuesadilla():void{
    this.quesadillas = this.cantidadQ;
    this.mostrarFormQuesadillas = false;
    
  }

  confirmarNuggets():void{
    this.nuggets = this.cantidadN;
    this.mostrarFormNuggets = false;
    
  }

  cerrarErrorQ():void{
    this.mostrarErrorQ = false;
  }

  cerrarErrorN():void{
    this.mostrarErrorN = false;
  }


  crearOrden():void{
    if(this.quesadillas <=0 && this.nuggets <=0){
      this.mostrarError = true;
      return;
    }
    if(this.ordenService.getOrdenById(this.ordenEditar?.id!)&& this.editar){
      this.ordenEditar!.quesadillas=this.quesadillas;
      this.ordenEditar!.nuggets=this.nuggets;
      this.ordenEditar!.total=(this.quesadillas*100) + (this.nuggets*100);
      this.ordenService.setOrden(this.ordenEditar!);
      this.editar=false;
      this.ordenService.deleteOrdenEditar();
      this.router.navigate(['/home']);
      //QUITAMOS LAS QUESADILLAS DEL INVENTARIO
      //this.inventarioService.reducirQuesadillas(this.quesadillas);
      this.inventarioService.setCantidad(1, this.inventarioService.getCantidad(1) - this.quesadillas);

      //QUITAMOS LOS NUGGETS DEL INVENTARIO
      //this.inventarioService.reducirNugets(this.nuggets);
      this.inventarioService.setCantidad(2, this.inventarioService.getCantidad(2) - this.nuggets);
      return;
    }

    //QUITAMOS LAS QUESADILLAS DEL INVENTARIO
    //this.inventarioService.reducirQuesadillas(this.quesadillas);
    this.inventarioService.setCantidad(1, this.inventarioService.getCantidad(1) - this.quesadillas);


    //QUITAMOS LOS NUGGETS DEL INVENTARIO
    //this.inventarioService.reducirNugets(this.nuggets);
    this.inventarioService.setCantidad(2, this.inventarioService.getCantidad(2) - this.nuggets);


    this.ordenService.crearOrden(this.quesadillas, this.nuggets);
    this.router.navigate(['/home']);

  }

  editarOrden(orden:Orden):void{
    
  }

  cerrarError():void{
    this.mostrarError = false;
  }

  cancelar():void{
    this.mostrarConfirmacion = true;

  }

  confirmarCancelar():void{
    if(this.authService.login(this.admin, this.password)){
      this.router.navigate(['/home']);
    }
    else{
      this.errorMSG = 'Credenciales incorrectas. Intente de nuevo.';
    }
  }
}
