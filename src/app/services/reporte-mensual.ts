import { Injectable, inject } from '@angular/core';
import { Ventas } from './ventas';

@Injectable({
  providedIn: 'root'
})


export class ReporteMensual {
  private ventasService = inject(Ventas);

  getDatos() {
    const reporte = this.ventasService.getReporte();
    const agrupado: { [dia: string]: { quesadillas: number, nuggets: number, total: number } } = {};

    for (const venta of reporte) {
      const dia = new Date(venta.fecha.replace(' ', 'T')).getDate().toString();

      if (!agrupado[dia]) {
        agrupado[dia] = { quesadillas: 0, nuggets: 0, total: 0 };
      }

      agrupado[dia].total += venta.total;

      for (const item of venta.detalle) {
        if (item.productoId === 1) agrupado[dia].quesadillas += item.cantidad;
        if (item.productoId === 2) agrupado[dia].nuggets += item.cantidad;
      }
    }

    return Object.entries(agrupado)
      .sort((a, b) => Number(a[0]) - Number(b[0]))
      .map(([dia, valores]) => ({
        mes: `Dia ${dia}`,
        quesadillas: valores.quesadillas,
        nugets: valores.nuggets,
        total: valores.total / 100
      }));
  }
}


//FORMA MANUAL PARA PRIMERA ENTREGA, 
/*

export class ReporteMensual {
  getDatos() {
    return [
      { mes: 'Dia 1', quesadillas: 6, nugets: 6,  total: 6.6 },
      { mes: 'Dia 2', quesadillas: 5, nugets: 7,  total: 5.7 },
      { mes: 'Dia 3', quesadillas: 8, nugets: 7,  total: 8.7 },
      { mes: 'Dia 4', quesadillas: 2, nugets: 9,  total: 2.9 }
    ];
  }
}

*/