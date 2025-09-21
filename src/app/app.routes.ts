import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent),
    title: 'Saint-Tropez Jardins - Élagage, Entretien & Paysagisme'
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent),
    title: 'Services de Paysagisme - Saint-Tropez Jardins'
  },
  {
    path: 'realisations',
    loadComponent: () => import('./pages/realisations/realisations').then(m => m.RealisationsPageComponent),
    title: 'Réalisations Paysagistes - Saint-Tropez Jardins'
  },
  {
    path: 'realisation/:slug',
    loadComponent: () => import('./pages/realisation/realisation').then(m => m.RealisationComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent),
    title: 'Contact - Saint-Tropez Jardins'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
