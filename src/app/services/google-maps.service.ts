import { Injectable } from '@angular/core';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  private isLoaded = false;
  private loadPromise: Promise<void> | null = null;

  constructor() {}

  async loadGoogleMaps(): Promise<void> {
    if (this.isLoaded) {
      return Promise.resolve();
    }

    if (this.loadPromise) {
      return this.loadPromise;
    }

    this.loadPromise = new Promise((resolve, reject) => {
      // Vérifier si Google Maps est déjà chargé
      if (typeof google !== 'undefined' && google.maps) {
        this.isLoaded = true;
        resolve();
        return;
      }

      // Créer le script s'il n'existe pas
      if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js';
        script.async = true;
        script.defer = true;
        
        script.onload = () => {
          this.isLoaded = true;
          resolve();
        };
        
        script.onerror = () => {
          reject(new Error('Impossible de charger Google Maps'));
        };
        
        document.head.appendChild(script);
      } else {
        // Le script existe, attendre qu'il se charge
        const checkLoaded = () => {
          if (typeof google !== 'undefined' && google.maps) {
            this.isLoaded = true;
            resolve();
          } else {
            setTimeout(checkLoaded, 100);
          }
        };
        checkLoaded();
      }
    });

    return this.loadPromise;
  }

  isGoogleMapsLoaded(): boolean {
    return this.isLoaded && typeof google !== 'undefined' && !!google.maps;
  }
}
