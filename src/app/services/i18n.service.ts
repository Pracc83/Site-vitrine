import { Injectable } from '@angular/core';
import { LOCALE_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private currentLocale = 'fr';

  constructor() {
    // Récupérer la langue depuis le localStorage ou utiliser 'fr' par défaut
    this.currentLocale = localStorage.getItem('locale') || 'fr';
  }

  getCurrentLocale(): string {
    return this.currentLocale;
  }

  setLocale(locale: string): void {
    this.currentLocale = locale;
    localStorage.setItem('locale', locale);
    
    // Recharger la page pour appliquer la nouvelle langue
    window.location.reload();
  }

  getAvailableLocales() {
    return [
      { code: 'fr', name: 'Français', flag: '🇫🇷' },
      { code: 'en', name: 'English', flag: '🇬🇧' }
    ];
  }

  isRTL(): boolean {
    // Pour l'instant, aucune langue RTL
    return false;
  }
}
