import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Reporte } from './reporte';

describe('Reporte', () => {
  let component: Reporte;
  let fixture: ComponentFixture<Reporte>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reporte],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Reporte);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
