import { Routes } from '@angular/router';
import { PageNotFound } from './pages/page-not-found/page-not-found';
import { Home } from './pages/home/home';
import { authGuard } from './shared/guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },

  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
    title: 'Project - About',
  },

  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
    title: 'Project - Contact',
  },
  {
    path: 'cart',
    loadComponent: () => import('./shared/components/cart/cart').then((m) => m.Cart),
    title: 'Project - Cart',
    canActivate: [authGuard],
  },

  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth').then((m) => m.Auth),
    children: [
      { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
      {
        path: 'sign-in',
        loadComponent: () =>
          import('./pages/auth/components/sign-in/sign-in').then((m) => m.SignIn),
        title: 'Project - Sign In',
      },
      {
        path: 'sign-up',
        loadComponent: () =>
          import('./pages/auth/components/sign-up/sign-up').then((m) => m.SignUp),
        title: 'Project - Sign Up',
      },
      {
        path: 'password-recovery',
        loadComponent: () =>
          import('./pages/auth/components/password-recovery/password-recovery').then(
            (m) => m.PasswordRecovery,
          ),
        title: 'Project - Password Recovery',
      },
    ],
  },

  { path: '**', component: PageNotFound },
];
