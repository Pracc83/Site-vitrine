import { Component, Input, Output, EventEmitter, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BrandInfo } from '../../models/jardin.models';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() brandInfo!: BrandInfo;
  @Output() tabChange = new EventEmitter<string>();
  @Output() scrollTo = new EventEmitter<string>();
  @Output() languageChange = new EventEmitter<string>();

  currentLanguage = 'fr';
  isMobileMenuOpen = false;
  isDarkMode = false;
  private themeSubscription?: Subscription;
  languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
  ];

  constructor(
    private translationService: TranslationService,
    private router: Router,
    private themeService: ThemeService
  ) {
    this.currentLanguage = this.translationService.getCurrentLanguage();
  }

  ngOnInit() {
    this.themeSubscription = this.themeService.darkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });
  }

  ngOnDestroy() {
    this.themeSubscription?.unsubscribe();
  }

  onTabChange(tab: string) {
    this.tabChange.emit(tab);
  }

  onScrollTo(section: string) {
    this.scrollTo.emit(section);
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  onLanguageChange(lang: string) {
    this.currentLanguage = lang;
    this.languageChange.emit(lang);
    this.translationService.setLanguage(lang);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  goToHome() {
    this.router.navigate(['/']);
    this.closeMobileMenu();
  }

  // Fermer le menu mobile quand on clique en dehors
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerButton = target.closest('button[aria-controls="mobile-menu"]');
    
    if (this.isMobileMenuOpen && mobileMenu && !mobileMenu.contains(target) && !hamburgerButton) {
      this.closeMobileMenu();
    }
  }

  // Fermer le menu mobile avec la touche Escape
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: Event) {
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }
}