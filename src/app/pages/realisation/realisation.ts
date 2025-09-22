import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryComponent } from '../../components/gallery/gallery';
import { HeaderComponent } from '../../components/header/header';
import { FooterComponent } from '../../components/footer/footer';
import { JardinService } from '../../services/jardin.service';
import { SEOService } from '../../services/seo.service';
import { RealisationDetail, BrandInfo, ContactInfo } from '../../models/jardin.models';

@Component({
  selector: 'app-realisation',
  standalone: true,
  imports: [CommonModule, GalleryComponent, HeaderComponent, FooterComponent],
  templateUrl: './realisation.html',
  styleUrls: ['./realisation.scss']
})
export class RealisationComponent implements OnInit {
  realisation!: RealisationDetail;
  loading = true;
  
  // Navigation entre réalisations
  previousRealisation: RealisationDetail | null = null;
  nextRealisation: RealisationDetail | null = null;
  
  // Données pour le header et footer
  brandInfo!: BrandInfo;
  contactInfo!: ContactInfo;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jardinService: JardinService,
    private seoService: SEOService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      this.loadRealisation(slug);
    });
  }

  private loadRealisation(slug: string) {
    this.loading = true;
    // Simulation d'un chargement
    setTimeout(() => {
      this.realisation = this.jardinService.getRealisationBySlug(slug) || this.jardinService.getRealisationById(1);
      this.brandInfo = this.jardinService.getBrandInfo();
      this.contactInfo = this.jardinService.getContactInfo();
      
      // Charger les réalisations précédente et suivante
      this.previousRealisation = this.jardinService.getPreviousRealisation(this.realisation.id);
      this.nextRealisation = this.jardinService.getNextRealisation(this.realisation.id);
      
      this.loading = false;
      this.updateSEO();
    }, 500);
  }

  private updateSEO() {
    if (this.realisation) {
      // Mise à jour des meta tags pour la page de réalisation
      this.seoService.updateRealisationPageSEO(this.realisation);
      
      // Ajout des données structurées pour l'article
      const articleData = this.seoService.generateStructuredData('Article', this.realisation);
      this.seoService.addStructuredData(articleData);
    }
  }

  goBack() {
    this.router.navigate(['/realisations']);
  }

  // Méthodes pour gérer les événements du header et footer
  onTabChange(tab: string) {
    // Logique pour changer d'onglet si nécessaire
    console.log('Tab changed to:', tab);
  }

  onScrollTo(section: string) {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Navigation entre réalisations
  goToPreviousRealisation() {
    if (this.previousRealisation) {
      this.router.navigate(['/realisation', this.previousRealisation.slug]);
    }
  }

  goToNextRealisation() {
    if (this.nextRealisation) {
      this.router.navigate(['/realisation', this.nextRealisation.slug]);
    }
  }
}