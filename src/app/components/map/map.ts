import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { GoogleMapsService } from '../../services/google-maps.service';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.html',
  styleUrls: ['./map.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  
  private map: any;
  private marker: any;
  private mapLoaded = false;

  constructor(private googleMapsService: GoogleMapsService) {}
  
  // Coordonnées de l'adresse
  private readonly officeLocation = {
    lat: 43.2528, // Latitude de Cogolin
    lng: 6.5306,  // Longitude de Cogolin
    address: 'Parc Activité Artisanale, 11 Rue François Arago 3, 83310 Cogolin'
  };

  async ngOnInit() {
    await this.loadGoogleMaps();
  }

  async ngAfterViewInit() {
    // Fallback si Google Maps n'est pas encore chargé
    setTimeout(async () => {
      if (!this.mapLoaded) {
        await this.loadGoogleMaps();
      }
    }, 2000);
  }

  private async loadGoogleMaps() {
    try {
      await this.googleMapsService.loadGoogleMaps();
      this.initMap();
    } catch (error) {
      console.error('Erreur lors du chargement de Google Maps:', error);
      this.showError();
    }
  }

  private showError() {
    if (this.mapContainer?.nativeElement) {
      this.mapContainer.nativeElement.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f3f4f6; border-radius: 1rem; flex-direction: column; gap: 1rem;">
          <svg style="width: 48px; height: 48px; color: #6b7280;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
          <div style="text-align: center;">
            <p style="margin: 0; color: #6b7280; font-weight: 500;">Impossible de charger la carte</p>
            <p style="margin: 0; color: #9ca3af; font-size: 14px;">Veuillez réessayer plus tard</p>
          </div>
        </div>
      `;
    }
  }

  ngOnDestroy() {
    if (this.map) {
      this.map = null;
    }
  }

  private initMap() {
    if (!this.mapContainer?.nativeElement || this.mapLoaded) return;

    try {
      // Configuration de la carte
      const mapOptions = {
        center: this.officeLocation,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'transit',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ],
        // Contrôles de la carte
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true
      };

      // Créer la carte
      this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
      this.mapLoaded = true;

    // Créer le marqueur
    this.marker = new google.maps.Marker({
      position: this.officeLocation,
      map: this.map,
      title: 'Saint-Tropez Jardins',
      animation: google.maps.Animation.DROP,
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" fill="#10b981" stroke="#ffffff" stroke-width="3"/>
            <path d="M12 16l8 8 8-8" stroke="#ffffff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        `),
        scaledSize: new google.maps.Size(40, 40),
        anchor: new google.maps.Point(20, 20)
      }
    });

    // InfoWindow avec les informations de contact
    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style="padding: 10px; max-width: 250px;">
          <h3 style="margin: 0 0 8px 0; color: #10b981; font-weight: 600;">Saint-Tropez Jardins</h3>
          <p style="margin: 0 0 4px 0; font-size: 14px;">${this.officeLocation.address}</p>
          <p style="margin: 0; font-size: 12px; color: #666;">Paysagistes d'exception</p>
        </div>
      `
    });

    // Ouvrir l'InfoWindow au clic sur le marqueur
    this.marker.addListener('click', () => {
      infoWindow.open(this.map, this.marker);
    });

    // Ouvrir l'InfoWindow automatiquement
    infoWindow.open(this.map, this.marker);

    } catch (error) {
      console.error('Erreur lors de l\'initialisation de la carte:', error);
      this.showError();
    }
  }

  // Méthode pour centrer la carte (utile pour les boutons)
  centerMap() {
    if (this.map) {
      this.map.setCenter(this.officeLocation);
      this.map.setZoom(15);
    }
  }
}
