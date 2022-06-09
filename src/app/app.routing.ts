import { Routes } from '@angular/router';
import { LoggedComponent } from './logged/logged.component';
import { LoginComponent } from './login/login.component';

export const AppRoutes: Routes = [
  {
    /***
     * Redireciona o path vazio para uma página
     * específica desse page que no caso é login
     */
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logged',
    component: LoggedComponent
  },
  {
    path: '**',
    component: LoginComponent
  }
];