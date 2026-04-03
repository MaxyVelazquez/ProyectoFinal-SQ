import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-administrar',
  imports: [CommonModule, Navbar],
  templateUrl: './administrar.html',
  styleUrl: './administrar.css',
})
export class Administrar {}
