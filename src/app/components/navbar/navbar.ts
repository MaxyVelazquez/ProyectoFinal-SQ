import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import {inject} from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  usuario:string='';
  menuAbierto: boolean = false;
  
  private router = inject(Router);
  constructor(private auth: AuthService) {
    
  }

  ngOnInit(){
    this.usuario = this.auth.getUser();
  }

  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }
   logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  
}
