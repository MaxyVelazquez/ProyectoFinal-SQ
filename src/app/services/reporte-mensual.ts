import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReporteMensual {

  getDatos() {
    return [
      { mes: 'Dia 1', quesadillas: 6, nugets: 6, total: 6.6 },
      { mes: 'Dia 2', quesadillas: 5, nugets: 7, total: 5.7 },
      { mes: 'Dia 3', quesadillas: 8, nugets: 7, total: 8.7 },
      { mes: 'Dia 4', quesadillas: 2, nugets: 9, total: 2.9 }
    ];
  }
}