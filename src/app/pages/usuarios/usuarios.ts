import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { Navbar } from '../../components/navbar/navbar';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Users } from '../../services/users';

@Component({
  selector: 'app-usuarios',
  imports: [Navbar, CommonModule, FormsModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios implements OnInit {

  ngOnInit(): void {
    this.getUsuarios();
  }
  usuarios:any[] = [];
  menuAbierto:number | null = null;
  mostrarModal:boolean = false;
  nuevoUsername:string = '';
  nuevoPassword:string = '';
  usuarioSeleccionado:any = null;
  menuPosicion = { top: 0, left: 0 };
  mostrarToast: boolean = false;
  mensajeToast: string = '';
  private toastTimer: any;

  constructor(private usersService: Users) {}

  toast(mensaje: string) {
    this.mensajeToast = mensaje;
    this.mostrarToast = true;
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.mostrarToast = false, 2800);
  }

  abrirModalCrear(){
    this.usuarioSeleccionado = null;
    this.mostrarModal = true;

  }

  getUsuarios(){
    this.usuarios = this.usersService.getAllUsers();
  }

  mostrarEditar(usuario:any){
    this.menuAbierto = null;
    if (usuario.id === 1) {
      this.toast('No se puede editar este usuario.');
      return;
    }
    this.usuarioSeleccionado = usuario;
    this.nuevoUsername = usuario.username;
    this.nuevoPassword = '';
    this.mostrarModal = true;
  }
  async editarUsuario(){
    if(this.usuarioSeleccionado && this.nuevoUsername && this.nuevoPassword){
      await this.usersService.updateUser(this.usuarioSeleccionado.id, this.nuevoUsername, this.nuevoPassword);
      this.getUsuarios();
      this.mostrarModal = false;
    }
  }

   borrarUsuario(usuario:any){
    this.menuAbierto = null;
    if (usuario.id===1) {
      this.toast('No se puede eliminar este usuario.');
      return;
    }
    this.usersService.deleteUser(usuario.id);
    this.getUsuarios();
  }

  async crearUsuario(){
    if(this.nuevoUsername && this.nuevoPassword){
      await this.usersService.setUser(this.nuevoUsername, this.nuevoPassword);
      this.usuarios = this.usersService.getAllUsers();
      this.mostrarModal = false;
      this.nuevoUsername = '';
      this.nuevoPassword = '';
    }
  }

  toggleMenu(id: number, event: MouseEvent) {
    const btn = event.target as HTMLElement;
    const rect = btn.getBoundingClientRect();
    this.menuPosicion = {
      top: rect.bottom + 4,
      left: rect.left - 100
    };
    this.menuAbierto = this.menuAbierto === id ? null : id;
  }
}
