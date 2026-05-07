import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { vi } from 'vitest';

import { CrearOrden } from './crear-orden';
import { OrdenService } from '../../services/orden';
import { AuthService } from '../../services/auth';

describe('CrearOrden', () => {

  let component: CrearOrden;
  let fixture: ComponentFixture<CrearOrden>;
  let router: Router;

  const mockOrdenService = {
    crearOrden: vi.fn(),
    getordenEditar: vi.fn().mockReturnValue(null),
    getOrdenById: vi.fn(),
    setOrden: vi.fn(),
    deleteOrdenEditar: vi.fn()
  };

  const mockAuthService = {
    login: vi.fn(),
    getUser: vi.fn().mockReturnValue('admin'),
  };

  

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [CrearOrden, RouterTestingModule],
      providers: [
        { provide: OrdenService, useValue: mockOrdenService },
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();
    router=TestBed.inject(Router);
    vi.spyOn(router, 'navigate')
    fixture = TestBed.createComponent(CrearOrden);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar formulario de quesadillas', () => {

    component.agregarQuesadilla();

    expect(component.mostrarFormQuesadillas).toBe(true);
  });

  it('debería mostrar formulario de nuggets', () => {

    component.agregarNuggets();

    expect(component.mostrarFormNuggets).toBe(true);
  });

  it('debería confirmar quesadillas correctamente', () => {

    component.cantidadQ = 2;

    component.confirmarQuesadilla();

    expect(component.quesadillas).toBe(2);
    expect(component.mostrarFormQuesadillas).toBe(false);
  });

  it('debería confirmar nuggets correctamente', () => {

    component.cantidadN = 3;

    component.confirmarNuggets();

    expect(component.nuggets).toBe(3);
    expect(component.mostrarFormNuggets).toBe(false);
  });

  it('debería mostrar error si no se agregan productos', () => {

    component.quesadillas = 0;
    component.nuggets = 0;

    component.crearOrden();

    expect(component.mostrarError).toBe(true);
  });

  it('debería crear una orden válida y navegar a home', () => {

    component.quesadillas = 2;
    component.nuggets = 3;

    mockOrdenService.getOrdenById.mockReturnValue(undefined);

    component.crearOrden();

    expect(mockOrdenService.crearOrden).toHaveBeenCalledWith(2, 3);

    expect(router.navigate)
      .toHaveBeenCalledWith(['/home']);
  });

  it('debería cerrar el mensaje de error', () => {

    component.mostrarError = true;

    component.cerrarError();

    expect(component.mostrarError).toBe(false);
  });

  it('debería mostrar confirmación al cancelar', () => {

    component.cancelar();

    expect(component.mostrarConfirmacion).toBe(true);
  });

  it('debería navegar al home si login es correcto', () => {

    component.admin = 'admin';
    component.password = '1234';

    mockAuthService.login.mockReturnValue(true);

    component.confirmarCancelar();

    expect(router.navigate)
      .toHaveBeenCalledWith(['/home']);
  });

  it('debería mostrar mensaje de error si login falla', () => {

    component.admin = 'admin';
    component.password = 'wrongpassword';

    mockAuthService.login.mockReturnValue(false);

    component.confirmarCancelar();

    expect(component.errorMSG)
      .toBe('Credenciales incorrectas. Intente de nuevo.');
  });

});