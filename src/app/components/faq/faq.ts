import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SEOService } from '../../services/seo.service';
import { StructuredDataService } from '../../services/structured-data.service';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-16 bg-gray-50">
      <div class="max-w-4xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Questions Fréquentes</h2>
        <div class="space-y-6">
          <div *ngFor="let faq of faqs" class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-xl font-semibold mb-3 text-green-800">{{ faq.question }}</h3>
            <p class="text-gray-700 leading-relaxed">{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class FaqComponent implements OnInit {
  faqs = [
    {
      question: "Quels types de jardins créez-vous à Saint-Tropez ?",
      answer: "Nous créons des jardins méditerranéens, des jardins de villas de luxe, des terrasses paysagées, des piscines naturelles et des aménagements extérieurs sur mesure, tous adaptés au climat méditerranéen de la Côte d'Azur."
    },
    {
      question: "Proposez-vous des services d'entretien régulier ?",
      answer: "Oui, nous offrons des contrats d'entretien personnalisés incluant la taille, l'arrosage, la fertilisation, le désherbage et la maintenance de vos espaces verts tout au long de l'année."
    },
    {
      question: "Travaillez-vous uniquement à Saint-Tropez ?",
      answer: "Nous intervenons principalement dans le Golfe de Saint-Tropez et ses environs (Ramatuelle, Gassin, La Croix-Valmer, Grimaud) dans un rayon de 50km pour garantir la qualité de nos services."
    },
    {
      question: "Quel est le délai moyen pour un projet de jardin ?",
      answer: "La durée dépend de la complexité du projet. Un jardin simple peut être réalisé en 2-4 semaines, tandis qu'un aménagement complet de villa peut prendre 2-6 mois. Nous établissons toujours un planning détaillé avant le début des travaux."
    },
    {
      question: "Proposez-vous des garanties sur vos créations ?",
      answer: "Oui, nous garantissons nos plantations pendant 2 ans et nos aménagements paysagers pendant 5 ans. Nous nous engageons également sur la reprise gratuite des végétaux en cas de problème."
    }
  ];

  constructor(
    private seoService: SEOService,
    private structuredDataService: StructuredDataService
  ) {}

  ngOnInit() {
    // Ajouter les données structurées FAQ
    const faqData = this.structuredDataService.generateFAQ(this.faqs);
    this.seoService.addStructuredData(JSON.stringify(faqData));
  }
}
