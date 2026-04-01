import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { authGuard } from './guards/auth-guard';
import { Cajas } from './pages/cajas/cajas';
import { Administrar } from './pages/administrar/administrar';
import { Reporte } from './pages/reporte/reporte';
import { Inventario } from './pages/inventario/inventario';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: Login},
    {path: 'home', component: Home, canActivate: [authGuard]},
    {path: 'cajas', component: Cajas, canActivate: [authGuard]}, //El authGuard se encarga de verificar si el usuario está autenticado antes de permitir el acceso a la ruta
    {path: 'administrar', component: Administrar, canActivate: [authGuard]},
    {path: 'reporte', component: Reporte, canActivate: [authGuard]}, 
    {path: 'inventario', component: Inventario, canActivate: [authGuard]}, 
];
