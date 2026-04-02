import { Injectable } from '@angular/core';
import {Orden} from '../models/orden.model';

@Injectable({
  providedIn: 'root',
})
export class OrdenService {

  private ordenes: Orden[]=[];
  private contOrden=1;


  getOrdenes():Orden[]{
    return this.ordenes;
  }

  getOrdenById(id:number):Orden | undefined{
    return this.ordenes.find(orden=>orden.id===id);
  }

  getOrdenActual():Orden | undefined{
    if(this.ordenes.length===0){
      return undefined;
    }
    return this.ordenes[this.ordenes.length-1];
  }

  crearOrden(quesadillas:number, nuggets:number):void{
    const orden: Orden={
      id:this.contOrden++,
      quesadillas,
      nuggets,
      precioQ:100,
      precioN:100,
      total:(quesadillas*100) + (nuggets*100)
    };
    this.ordenes.push(orden);
  }

  eliminarOrden(id:number):void{
    if(id===this.contOrden){
      this.ordenes.pop();
    }
    else{
      this.ordenes = this.ordenes.filter(orden=>orden.id!==id);
    }

  }
}
