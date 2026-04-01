import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private USER= 'admin';
  private PASS= '1234';


  login(username:string, password:string):boolean{
    if(username === this.USER && password === this.PASS){
      localStorage.setItem('sesion', 'true');
      localStorage.setItem('usuario', username);
      return true;
    }
    return false;
  }

  logout():void{
    localStorage.removeItem('sesion');

  }

  isLoggedIn():boolean{
    return localStorage.getItem('sesion') === 'true';
  }

  getUser():string{
    return localStorage.getItem('usuario') ?? 'invitado';
  }
}
