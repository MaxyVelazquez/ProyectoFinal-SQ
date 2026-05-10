import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/*
export class ReporteMensual {
  getDatos() {
    const reporteAux = JSON.parse(localStorage.getItem("reporte") || '[]');

    const agrupado: { [dia: string]: { quesadillas: number, nuggets: number, total: number } } = {};

    for (const item of reporteAux) {
      if (!agrupado[item.dia]) {
        agrupado[item.dia] = { quesadillas: 0, nuggets: 0, total: 0 };
      }
      agrupado[item.dia].quesadillas += item.cantidadQuesadillas;
      agrupado[item.dia].nuggets += item.cantidadNuggets;
      agrupado[item.dia].total += item.total;
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
}*/

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