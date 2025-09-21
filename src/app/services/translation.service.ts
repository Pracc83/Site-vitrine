import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Translation {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLanguage = new BehaviorSubject<string>('fr');
  public currentLanguage$ = this.currentLanguage.asObservable();

  private translations: { [lang: string]: Translation } = {
    fr: {
      'header.brand.name': 'Saint‑Tropez Jardins',
      'header.brand.subtitle': 'Élagage • Entretien • Gros spécimens',
      'header.nav.services': 'Métiers',
      'header.nav.realisations': 'Réalisations',
      'header.nav.fleet': 'Flotte & Logistique',
      'header.nav.zone': 'Zone d\'intervention',
      'header.nav.contact': 'Contact',
      'header.cta.quote': 'Demander un devis',
      'header.cta.quote.mobile': 'Devis',
      'hero.location': 'Golfe de Saint‑Tropez & alentours',
      'hero.title': 'Paysagistes d\'exception pour jardins d\'exception',
      'hero.description': 'Nous accompagnons une clientèle exigeante — du particulier à la propriété de prestige — pour sublimer et pérenniser vos espaces verts : élagage, entretien complet, plantations et déplacement de grands sujets.',
      'hero.cta.quote': 'Obtenir un devis',
      'hero.cta.discover': 'Découvrir nos métiers'
    },
    en: {
      'header.brand.name': 'Saint‑Tropez Gardens',
      'header.brand.subtitle': 'Tree Pruning • Maintenance • Large Specimens',
      'header.nav.services': 'Services',
      'header.nav.realisations': 'Projects',
      'header.nav.fleet': 'Fleet & Logistics',
      'header.nav.zone': 'Service Area',
      'header.nav.contact': 'Contact',
      'header.cta.quote': 'Request Quote',
      'header.cta.quote.mobile': 'Quote',
      'hero.location': 'Gulf of Saint‑Tropez & surroundings',
      'hero.title': 'Exceptional landscapers for exceptional gardens',
      'hero.description': 'We work with demanding clients — from private individuals to prestigious properties — to enhance and preserve your green spaces: tree pruning, complete maintenance, planting and moving large specimens.',
      'hero.cta.quote': 'Get a Quote',
      'hero.cta.discover': 'Discover our services'
    }
  };

  constructor() {
    // Récupérer la langue depuis le localStorage
    const savedLang = localStorage.getItem('locale') || 'fr';
    this.currentLanguage.next(savedLang);
  }

  getCurrentLanguage(): string {
    return this.currentLanguage.value;
  }

  setLanguage(lang: string): void {
    this.currentLanguage.next(lang);
    localStorage.setItem('locale', lang);
  }

  translate(key: string): string {
    const lang = this.currentLanguage.value;
    return this.translations[lang]?.[key] || key;
  }

  getAvailableLanguages() {
    return [
      { code: 'fr', name: 'Français', flag: '🇫🇷' },
      { code: 'en', name: 'English', flag: '🇬🇧' }
    ];
  }
}
