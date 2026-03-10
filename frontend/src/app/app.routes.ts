import { Routes } from '@angular/router';
import { Shopping } from './components/shopping/shopping';
import { Cart } from './components/cart/cart';
import { Login } from './components/login/login';
import { Revenue } from './components/revenue/revenue';
import { Vip } from './components/vip/vip';

export const routes: Routes = [
    { path: '', redirectTo: 'shopping', pathMatch: 'full' },
    { path: 'shopping', component: Shopping },
    { path: 'cart', component: Cart },
    { path: 'login', component: Login },
    { path: 'revenue', component: Revenue },
    { path: 'vip', component: Vip }
];
