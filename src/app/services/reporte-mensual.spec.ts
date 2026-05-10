import { TestBed } from '@angular/core/testing';
import {vi} from 'vitest';

import { ReporteMensual } from './reporte-mensual';

describe('ReporteMensual', () => {
  let service: ReporteMensual;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteMensual);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('debería retornar array vacío si no hay datos', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    const datos = service.getDatos();
    expect(datos).toEqual([]);
  });


  it('debería retornar datos de un día correctamente', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify([
      { dia: 1, mes: 5, cantidadQuesadillas: 3, cantidadNuggets: 2, total: 500 }
    ]));
    const datos = service.getDatos();
    expect(datos.length).toBe(1);
    expect(datos[0].mes).toBe('Dia 1');
    expect(datos[0].quesadillas).toBe(3);
    expect(datos[0].nugets).toBe(2);
    expect(datos[0].total).toBe(5); 
  });

  it('debería agrupar y sumar órdenes del mismo día', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify([
      { dia: 1, mes: 5, cantidadQuesadillas: 2, cantidadNuggets: 1, total: 300 },
      { dia: 1, mes: 5, cantidadQuesadillas: 3, cantidadNuggets: 2, total: 500 }
    ]));
    const datos = service.getDatos();
    expect(datos.length).toBe(1);
    expect(datos[0].quesadillas).toBe(5);
    expect(datos[0].nugets).toBe(3);
    expect(datos[0].total).toBe(8);
  });


  it('debería ordenar los días correctamente', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify([
      { dia: 3, mes: 5, cantidadQuesadillas: 1, cantidadNuggets: 1, total: 200 },
      { dia: 1, mes: 5, cantidadQuesadillas: 1, cantidadNuggets: 1, total: 200 },
      { dia: 2, mes: 5, cantidadQuesadillas: 1, cantidadNuggets: 1, total: 200 }
    ]));
    const datos = service.getDatos();
    expect(datos[0].mes).toBe('Dia 1');
    expect(datos[1].mes).toBe('Dia 2');
    expect(datos[2].mes).toBe('Dia 3');
  });
});
