import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InventarioSQ {
  

  setQuesadillas(aux: number): void {
    localStorage.setItem('quesadillas', aux.toString());
  }

  setNugets(aux: number): void {
    localStorage.setItem('nugets', aux.toString());
  }

  getQuesadillas(): number {
    return Number(localStorage.getItem('quesadillas')) || 0;
  }

  getNugets(): number {
    return Number(localStorage.getItem('nugets')) || 0;
  }


  reducirQuesadillas(cantidad: number): void {
  const actual = Number(localStorage.getItem('quesadillas')) || 0;
  localStorage.setItem('quesadillas', (actual - cantidad).toString());
}

reducirNugets(cantidad: number): void {
  const actual = Number(localStorage.getItem('nugets')) || 0;
  localStorage.setItem('nugets', (actual - cantidad).toString());
}
}
