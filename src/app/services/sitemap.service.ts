import { Injectable } from '@angular/core';
import { JardinService } from './jardin.service';

@Injectable({
  providedIn: 'root'
})
export class SitemapService {
  private baseUrl = 'https://mon-projet-angular-3h0zgfnce-pracc83s-projects.vercel.app';

  constructor(private jardinService: JardinService) {}

  generateSitemap(): string {
    const pages = [
      { url: '', priority: '1.0', changefreq: 'weekly' },
      { url: '/realisations', priority: '0.9', changefreq: 'weekly' },
      { url: '/services', priority: '0.8', changefreq: 'monthly' },
      { url: '/contact', priority: '0.7', changefreq: 'monthly' }
    ];

    // Ajouter les pages de réalisations dynamiques
    const realisations = this.jardinService.getRealisations();
    realisations.forEach(realisation => {
      pages.push({
        url: `/realisation/${realisation.id}`,
        priority: '0.8',
        changefreq: 'monthly'
      });
    });

    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    pages.forEach(page => {
      sitemap += '  <url>\n';
      sitemap += `    <loc>${this.baseUrl}${page.url}</loc>\n`;
      sitemap += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
      sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
      sitemap += `    <priority>${page.priority}</priority>\n`;
      sitemap += '  </url>\n';
    });

    sitemap += '</urlset>';
    return sitemap;
  }
}
