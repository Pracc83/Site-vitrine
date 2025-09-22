import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JardinService } from '../../services/jardin.service';
import { SEOService } from '../../services/seo.service';
import { RealisationDetail, BrandInfo, ContactInfo } from '../../models/jardin.models';
import { HeaderComponent } from '../../components/header/header';
import { FooterComponent } from '../../components/footer/footer';

@Component({
  selector: 'app-realisations-page',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './realisations.html',
  styleUrls: ['./realisations.scss']
})
export class RealisationsPageComponent implements OnInit {
  realisations: RealisationDetail[] = [];
  filteredRealisations: RealisationDetail[] = [];
  categories: string[] = ['Toutes', 'Aménagement complet', 'Élagage spécialisé', 'Entretien', 'Plantation'];
  selectedCategory: string = 'Toutes';
  loading = true;
  
  // Données pour le header et footer
  brandInfo!: BrandInfo;
  contactInfo!: ContactInfo;

  constructor(
    private jardinService: JardinService,
    private seoService: SEOService
  ) {}

  ngOnInit() {
    this.loadRealisations();
    this.updateSEO();
  }

  private loadRealisations() {
    this.loading = true;
    // Simulation d'un chargement
    setTimeout(() => {
      this.realisations = this.jardinService.getRealisationsDetails();
      this.filteredRealisations = [...this.realisations];
      this.brandInfo = this.jardinService.getBrandInfo();
      this.contactInfo = this.jardinService.getContactInfo();
      this.loading = false;
    }, 500);
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    
    if (category === 'Toutes') {
      this.filteredRealisations = [...this.realisations];
    } else {
      this.filteredRealisations = this.realisations.filter(
        realisation => realisation.category === category
      );
    }
  }

  private updateSEO() {
    this.seoService.updateSEO({
      title: 'Réalisations Paysagistes - Nos Projets d\'Exception | Saint-Tropez Jardins',
      description: 'Découvrez nos réalisations paysagères d\'exception dans le Golfe de Saint-Tropez. Aménagements complets, élagage spécialisé, entretien et plantations de grands sujets.',
      keywords: 'réalisations paysagistes, projets jardins, Saint-Tropez, aménagement paysager, élagage, plantation, avant après',
      url: '/realisations'
    });

    // Données structurées pour la page des réalisations
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Réalisations Paysagistes - Saint-Tropez Jardins",
      "description": "Collection de nos réalisations paysagères d'exception dans le Golfe de Saint-Tropez",
      "url": "https://saint-tropez-jardins.fr/realisations",
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": this.realisations.length,
        "itemListElement": this.realisations.map((realisation, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "CreativeWork",
            "name": realisation.title,
            "description": realisation.subtitle,
            "url": `https://saint-tropez-jardins.fr/realisation/${realisation.slug}`,
            "image": realisation.heroImage,
            "dateCreated": `${realisation.year}-01-01`
          }
        }))
      }
    };

    this.seoService.addStructuredData(JSON.stringify(structuredData));
  }

  // Méthodes pour gérer les événements du header et footer
  onTabChange(tab: string) {
    // Rediriger vers la page d'accueil avec l'onglet approprié
    window.location.href = `/#services?tab=${tab}`;
  }

  onScrollTo(section: string) {
    if (section === 'contact') {
      // Scroll vers la section contact sur cette page
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Rediriger vers la page d'accueil pour les autres sections
      window.location.href = `/#${section}`;
    }
  }
}
