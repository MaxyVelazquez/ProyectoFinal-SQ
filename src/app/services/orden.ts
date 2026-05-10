import { Injectable } from '@angular/core';
import {Orden} from '../models/orden.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdenService {

  private ordenes: Orden[]=[];
  private ordenesPagadas: Orden[]=[];
  private contOrden=1;
  private ordenesSubject= new BehaviorSubject<Orden | undefined>(undefined);
  private ordenEditarId:number | undefined;

  constructor() {}


  getOrdenes():Orden[]{
    return this.ordenes;
  }

  getOrdenById(id:number):Orden | undefined{
    return this.ordenes.find(orden=>orden.id===id);
  }

  getOrdenActual$():Observable<Orden | undefined>{
    return this.ordenesSubject.asObservable();
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
    this.ordenesSubject.next(orden);
  }

  pushOrdenPagada(orden:Orden):void{
    this.ordenesPagadas.push(orden);
  }
  saveOrdenEditar(ordenId:number):void{
    this.ordenEditarId=ordenId;
  }
  getordenEditar():number | undefined{
    return this.ordenEditarId;
  }
  deleteOrdenEditar():void{
    this.ordenEditarId=undefined;
  }
  setOrden(orden:Orden):boolean{
    const index = this.ordenes.findIndex(o => o.id === orden.id);
    if (index !== -1) {
      console.log(orden);
      this.ordenes[index] = orden;
      this.ordenesSubject.next(orden);
      return true;
    }
    return false;
  }

  eliminarOrden(id: number): void {
    this.ordenes = this.ordenes.filter(orden => orden.id !== id);
  }
}
