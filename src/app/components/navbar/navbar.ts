import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  usuario:string='';
  constructor(private auth: AuthService) {
    
  }

  ngOnInit(){
    this.usuario = this.auth.getUser();
  }

  
}
