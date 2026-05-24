import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Usuarios } from './usuarios';
import { Users } from '../../services/users';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

const mockUsersService = {
  getAllUsers: () => [
    { id: 1, username: 'admin', password: '123' },
    { id: 2, username: 'maxy', password: '456' }
  ],
  setUser: vi.fn(),
  deleteUser: vi.fn(),
  updateUser: vi.fn(),
};

describe('Usuarios', () => {
  let component: Usuarios;
  let fixture: ComponentFixture<Usuarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Usuarios, CommonModule, FormsModule, RouterTestingModule],
      providers: [
        { provide: Users, useValue: mockUsersService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Usuarios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar usuarios al iniciar', () => {
    expect(component.usuarios.length).toBe(2);
  });

  it('debe abrir modal de crear sin usuario seleccionado', () => {
    component.abrirModalCrear();
    expect(component.mostrarModal).toBe(true);
    expect(component.usuarioSeleccionado).toBeNull();
  });

  it('debe abrir modal de editar con usuario seleccionado', () => {
    const usuario = { id: 1, username: 'admin', password: '123' };
    component.mostrarEditar(usuario);
    expect(component.mostrarModal).toBe(true);
    expect(component.usuarioSeleccionado).toEqual(usuario);
  });

  it('debe crear un usuario y limpiar los campos', () => {
    component.nuevoUsername = 'nuevo';
    component.nuevoPassword = 'pass';
    component.crearUsuario();
    expect(mockUsersService.setUser).toHaveBeenCalledWith('nuevo', 'pass');
    expect(component.nuevoUsername).toBe('');
    expect(component.nuevoPassword).toBe('');
    expect(component.mostrarModal).toBe(false);
  });

  it('no debe crear usuario si faltan campos', () => {
    mockUsersService.setUser.mockClear();
    component.nuevoUsername = '';
    component.nuevoPassword = '';
    component.crearUsuario();
    expect(mockUsersService.setUser).not.toHaveBeenCalled();
  });

  it('debe borrar un usuario', () => {
    const usuario = { id: 1, username: 'admin', password: '123' };
    component.borrarUsuario(usuario);
    expect(mockUsersService.deleteUser).toHaveBeenCalledWith(1);
  });

  it('debe editar un usuario si todos los campos son válidos', () => {
    component.usuarioSeleccionado = { id: 1, username: 'editado', password: 'newpass' };
    component.editarUsuario();
    expect(mockUsersService.updateUser).toHaveBeenCalledWith(1, 'editado', 'newpass');
    expect(component.mostrarModal).toBe(false);
  });

  it('no debe editar si faltan campos en usuarioSeleccionado', () => {
    mockUsersService.updateUser.mockClear();
    component.usuarioSeleccionado = { id: 1, username: '', password: '' };
    component.editarUsuario();
    expect(mockUsersService.updateUser).not.toHaveBeenCalled();
  });

  it('debe alternar el menú al hacer toggleMenu', () => {
    const mockEvent = { target: { getBoundingClientRect: () => ({ bottom: 100, left: 200 }) } } as any;
    component.toggleMenu(1, mockEvent);
    expect(component.menuAbierto).toBe(1);
    component.toggleMenu(1, mockEvent);
    expect(component.menuAbierto).toBeNull();
  });

  it('debe cerrar el menú anterior al abrir uno nuevo', () => {
    const mockEvent = { target: { getBoundingClientRect: () => ({ bottom: 100, left: 200 }) } } as any;
    component.toggleMenu(1, mockEvent);
    component.toggleMenu(2, mockEvent);
    expect(component.menuAbierto).toBe(2);
  });
});