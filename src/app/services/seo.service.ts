import { Injectable, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SEOService {
  private baseUrl = 'https://saint-tropez-jardins.fr';
  private defaultImage = '/assets/images/og-image.jpg';

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private document: Document
  ) {}

  updateSEO(data: SEOData): void {
    // Mise à jour du titre
    this.title.setTitle(data.title);

    // Meta description
    this.meta.updateTag({ name: 'description', content: data.description });

    // Meta keywords
    if (data.keywords) {
      this.meta.updateTag({ name: 'keywords', content: data.keywords });
    }

    // URL canonique
    const canonicalUrl = data.url ? `${this.baseUrl}${data.url}` : this.baseUrl;
    this.updateCanonicalUrl(canonicalUrl);

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: data.title });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    this.meta.updateTag({ property: 'og:image', content: data.image || this.defaultImage });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:type', content: data.type || 'website' });

    // Twitter Card
    this.meta.updateTag({ property: 'twitter:title', content: data.title });
    this.meta.updateTag({ property: 'twitter:description', content: data.description });
    this.meta.updateTag({ property: 'twitter:image', content: data.image || this.defaultImage });
    this.meta.updateTag({ property: 'twitter:url', content: canonicalUrl });
  }

  private updateCanonicalUrl(url: string): void {
    const head = this.document.getElementsByTagName('head')[0];
    let element: HTMLLinkElement = this.document.querySelector(`link[rel='canonical']`) as HTMLLinkElement;
    
    if (element == null) {
      element = this.document.createElement('link') as HTMLLinkElement;
      head.appendChild(element);
    }
    
    element.setAttribute('rel', 'canonical');
    element.setAttribute('href', url);
  }

  // Méthodes spécifiques pour chaque page
  updateHomePageSEO(): void {
    this.updateSEO({
      title: 'Saint-Tropez Jardins - Élagage, Entretien & Paysagisme | Golfe de Saint-Tropez',
      description: 'Paysagistes d\'exception pour jardins d\'exception. Élagage, entretien complet, plantations et déplacement de grands sujets dans le Golfe de Saint-Tropez et alentours.',
      keywords: 'paysagiste, élagage, entretien jardin, Saint-Tropez, Golfe de Saint-Tropez, gros spécimens, plantation, paysagisme',
      url: '/'
    });
  }

  updateRealisationPageSEO(realisation: any): void {
    this.updateSEO({
      title: realisation.seoTitle || `${realisation.title} - Réalisation Paysagiste | Saint-Tropez Jardins`,
      description: realisation.seoDescription || `${realisation.description.substring(0, 150)}... Découvrez cette réalisation paysagère dans le Golfe de Saint-Tropez.`,
      keywords: realisation.seoKeywords || `réalisation paysagiste, ${realisation.category}, ${realisation.location}, Saint-Tropez, jardin, paysagisme`,
      image: realisation.heroImage,
      url: `/realisation/${realisation.slug}`,
      type: 'article'
    });
  }

  // Données structurées JSON-LD
  generateStructuredData(type: 'Organization' | 'Service' | 'Article', data?: any): string {
    let structuredData: any = {};

    switch (type) {
      case 'Organization':
        structuredData = {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Saint-Tropez Jardins",
          "description": "Paysagistes d'exception pour jardins d'exception dans le Golfe de Saint-Tropez",
          "url": this.baseUrl,
          "logo": `${this.baseUrl}/assets/images/logo.png`,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Saint-Tropez",
            "addressRegion": "Var",
            "addressCountry": "FR"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+33-4-XX-XX-XX-XX",
            "contactType": "customer service",
            "areaServed": "FR",
            "availableLanguage": "French"
          },
          "sameAs": [
            "https://www.facebook.com/saint-tropez-jardins",
            "https://www.instagram.com/saint-tropez-jardins"
          ]
        };
        break;

      case 'Service':
        structuredData = {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": data?.title || "Services de paysagisme",
          "description": data?.description || "Élagage, entretien et paysagisme dans le Golfe de Saint-Tropez",
          "provider": {
            "@type": "Organization",
            "name": "Saint-Tropez Jardins"
          },
          "areaServed": {
            "@type": "Place",
            "name": "Golfe de Saint-Tropez"
          },
          "serviceType": "Paysagisme et entretien de jardins"
        };
        break;

      case 'Article':
        structuredData = {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": data?.title,
          "description": data?.description,
          "image": data?.heroImage,
          "author": {
            "@type": "Organization",
            "name": "Saint-Tropez Jardins"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Saint-Tropez Jardins",
            "logo": {
              "@type": "ImageObject",
              "url": `${this.baseUrl}/assets/images/logo.png`
            }
          },
          "datePublished": new Date().toISOString(),
          "dateModified": new Date().toISOString()
        };
        break;
    }

    return JSON.stringify(structuredData);
  }

  addStructuredData(data: string): void {
    // Supprimer l'ancien script s'il existe
    const existingScript = this.document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Ajouter le nouveau script
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = data;
    this.document.head.appendChild(script);
  }
}
