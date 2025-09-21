import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import des composants
import { HeaderComponent } from '../../components/header/header';
import { HeroComponent } from '../../components/hero/hero';
import { ServicesComponent } from '../../components/services/services';
import { RealisationsComponent } from '../../components/realisations/realisations';
import { ZoneComponent } from '../../components/zone/zone';
import { OffersComponent } from '../../components/offers/offers';
import { ContactComponent } from '../../components/contact/contact';
import { FooterComponent } from '../../components/footer/footer';

// Import des services et modèles
import { JardinService } from '../../services/jardin.service';
import { SEOService } from '../../services/seo.service';
import { BrandInfo, Service, RealisationDetail, ContactInfo, Offer, Zone } from '../../models/jardin.models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    ServicesComponent,
    RealisationsComponent,
    ZoneComponent,
    OffersComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {
  // Données
  brandInfo!: BrandInfo;
  services!: Service[];
  realisations!: RealisationDetail[];
  contactInfo!: ContactInfo;
  offers!: Offer[];
  zones!: Zone[];
  heroImage!: string;
  zoneImage!: string;
  
  // État
  activeTab: string = 'elagage';

  constructor(
    private jardinService: JardinService,
    private seoService: SEOService
  ) {}

  ngOnInit() {
    this.loadData();
    this.updateSEO();
  }

  private loadData() {
    this.brandInfo = this.jardinService.getBrandInfo();
    this.services = this.jardinService.getServices();
    this.realisations = this.jardinService.getRealisationsDetails().slice(0, 3); // Afficher seulement les 3 premières
    this.contactInfo = this.jardinService.getContactInfo();
    this.offers = this.jardinService.getOffers();
    this.zones = this.jardinService.getZones();
    this.heroImage = this.jardinService.getHeroImage();
    this.zoneImage = this.jardinService.getZoneImage();
  }

  onTabChange(tab: string) {
    this.activeTab = tab;
  }

  onScrollTo(section: string) {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  private updateSEO() {
    // Mise à jour des meta tags pour la page d'accueil
    this.seoService.updateHomePageSEO();
    
    // Ajout des données structurées
    const organizationData = this.seoService.generateStructuredData('Organization');
    this.seoService.addStructuredData(organizationData);
  }
}