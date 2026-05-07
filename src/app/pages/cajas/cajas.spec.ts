import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Cajas } from './cajas';

describe('Cajas', () => {
  let component: Cajas;
  let fixture: ComponentFixture<Cajas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cajas],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Cajas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
