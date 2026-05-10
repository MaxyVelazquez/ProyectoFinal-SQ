import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { Reporte } from './reporte';
import { ReporteMensual } from '../../services/reporte-mensual';

describe('Reporte', () => {
  let component: Reporte;
  let fixture: ComponentFixture<Reporte>;

  const mockReporteService = {
    getDatos: vi.fn().mockReturnValue([
      { mes: 'Dia 1', quesadillas: 3, nugets: 2, total: 5 },
      { mes: 'Dia 2', quesadillas: 5, nugets: 4, total: 9 }
    ])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reporte],
      providers: [
        provideRouter([]),
        { provide: ReporteMensual, useValue: mockReporteService }
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(Reporte);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería asignar labels correctamente', () => {
    component.cargarDatos();
    expect(component.lineChartData.labels).toEqual(['Dia 1', 'Dia 2']);
  });

  it('debería asignar datos de quesadillas correctamente', () => {
    component.cargarDatos();
    expect(component.lineChartData.datasets[0].data).toEqual([3, 5]);
  });

  it('debería asignar datos de nuggets correctamente', () => {
    component.cargarDatos();
    expect(component.lineChartData.datasets[1].data).toEqual([2, 4]);
  });

  it('debería asignar datos de total correctamente', () => {
    component.cargarDatos();
    expect(component.lineChartData.datasets[2].data).toEqual([5, 9]);
  });

  it('debería quedar vacío si el servicio no retorna datos', () => {
    mockReporteService.getDatos.mockReturnValue([]);
    component.cargarDatos();
    expect(component.lineChartData.labels).toEqual([]);
    expect(component.lineChartData.datasets[0].data).toEqual([]);
    expect(component.lineChartData.datasets[1].data).toEqual([]);
    expect(component.lineChartData.datasets[2].data).toEqual([]);
  });
});