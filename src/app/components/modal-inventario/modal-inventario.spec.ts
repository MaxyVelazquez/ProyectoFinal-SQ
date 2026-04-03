import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInventario } from './modal-inventario';

describe('ModalInventario', () => {
  let component: ModalInventario;
  let fixture: ComponentFixture<ModalInventario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalInventario],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalInventario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
