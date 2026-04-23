import { Routes } from '@angular/router';
import { PageNotFound } from './pages/page-not-found/page-not-found';
import { Home } from './pages/home/home';

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

  { path: '**', component: PageNotFound },
];
