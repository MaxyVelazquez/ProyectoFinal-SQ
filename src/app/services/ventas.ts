import { inject, Injectable } from '@angular/core';
import { QuesaurillasDb } from './quesaurillas-db';

export interface Venta {
  id: number;
  fecha: string;
  total: number;
}

export interface DetalleVenta {
  id: number;
  ventaId: number;
  productoId: number;
  cantidad: number;
  precioUnitario: number;
}

export interface VentaCompleta {
  id: number;
  fecha: string;
  total: number;
  detalle: DetalleVenta[];
}

@Injectable({
  providedIn: 'root',
})


export class Ventas {
  private db= inject(QuesaurillasDb);

  getVentas(): Venta[] {
    return this.db.query<Venta>(`SELECT * FROM ventas ORDER BY fecha DESC`);
  }


  getDetalleVenta(ventaId: number): DetalleVenta[] {
    return this.db.query<DetalleVenta>(
      `SELECT * FROM detalleVentas WHERE ventaId = ?`,
      [ventaId]
    );
  }


  getReporte(): VentaCompleta[] {
    const ventas = this.getVentas();
    return ventas.map(venta => ({
      ...venta,
      detalle: this.getDetalleVenta(venta.id)
    }));
  }


  registrarVenta(total: number, detalle: {productoId: number, cantidad: number, precioUnitario: number}[]): void{
    this.db.run(`INSERT INTO ventas (total) VALUES (?)`, [total]);

    const resultado = this.db.query<{id: number}>(`SELECT last_insert_rowid() as id`);
    const ventaId = resultado[0].id;


    for(const item of detalle){
      this.db.run(
        `INSER INTO detalleVentas (ventaId, productoId, cantidad, precioUnitario) VALUES (?,?,?,?,)`,
        [ventaId, item.productoId, item.cantidad, item.precioUnitario]
      );
    }

  }


}
