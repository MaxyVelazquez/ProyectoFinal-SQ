import { TestBed } from '@angular/core/testing';

import { ReporteMensual } from './reporte-mensual';

describe('ReporteMensual', () => {
  let service: ReporteMensual;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteMensual);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
