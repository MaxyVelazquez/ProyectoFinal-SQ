import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private auth: AuthService, private router: Router) {}

  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
