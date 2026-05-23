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

  constructor(private usersService: Users) {}

  abrirModalCrear(){
    this.usuarioSeleccionado = null;
    this.mostrarModal = true;

  }

  getUsuarios(){
    this.usuarios = this.usersService.getAllUsers();
  }

  mostrarEditar(usuario:any){
    this.usuarioSeleccionado = usuario;
    this.mostrarModal = true;
  }
  editarUsuario(){
    if(this.usuarioSeleccionado && this.usuarioSeleccionado.username && this.usuarioSeleccionado.password){
      this.usersService.updateUser(this.usuarioSeleccionado.id, this.usuarioSeleccionado.username, this.usuarioSeleccionado.password);
      this.getUsuarios();
      this.mostrarModal = false;
    }
  }

   borrarUsuario(usuario:any){
    this.usersService.deleteUser(usuario.id);
    this.getUsuarios();
  }

  crearUsuario(){
    if(this.nuevoUsername && this.nuevoPassword){
      this.usersService.setUser(this.nuevoUsername, this.nuevoPassword);
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
