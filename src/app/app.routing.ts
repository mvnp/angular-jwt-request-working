import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LoggedComponent } from './logged/logged.component';

import { AuthGuard } from './_helpers/auth.guard';

export const AppRoutes: Routes = [
    {
        /***
         * Redireciona o path vazio para uma página
         * específica desse page que no caso é login
         */
        path: '',
        component: LoginComponent
    }, {
        path: 'login',
        component: LoginComponent
    }, {
        path: 'logged',
        canActivate: [AuthGuard],
        component: LoggedComponent,
    }, {
        path: '**',
        component: LoginComponent
    }
];
