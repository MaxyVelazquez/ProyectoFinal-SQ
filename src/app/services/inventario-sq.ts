import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InventarioSQ {
  private quesadillas: number = Number(localStorage.getItem('quesadillas')) || 200;
  private nugets: number = Number(localStorage.getItem('nugets')) || 300;

  setQuesadillas(aux: number): void {
    this.quesadillas = aux;
    localStorage.setItem('quesadillas', aux.toString());
  }

  setNugets(aux: number): void {
    this.nugets = aux;
    localStorage.setItem('nugets', aux.toString());
  }

  getQuesadillas(): number {
    return this.quesadillas;
  }

  getNugets(): number {
    return this.nugets;
  }
}
