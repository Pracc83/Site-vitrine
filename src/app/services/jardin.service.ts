import { Injectable } from '@angular/core';
import { Service, Realisation, ContactInfo, Offer, Zone, BrandInfo, RealisationDetail, GalleryImage } from '../models/jardin.models';

@Injectable({
  providedIn: 'root'
})
export class JardinService {
  
  private readonly IMAGES = {
    hero: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&h=900&fit=crop&crop=center",
    elagage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop&crop=center",
    entretien: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&h=800&fit=crop&crop=center",
    gros1: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop&crop=center",
    gros2: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&h=800&fit=crop&crop=center",
    flotte: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=800&fit=crop&crop=center",
    zone: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=900&fit=crop&crop=center",
    realisations: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center",
    ],
  };

  getBrandInfo(): BrandInfo {
    return {
      name: "Saint‑Tropez Jardins",
      subtitle: "Élagage • Entretien • Gros spécimens",
      icon: "leaf"
    };
  }

  getServices(): Service[] {
    return [
      {
        id: 'elagage',
        title: 'Élagage & abattage contrôlé',
        description: 'Sécurité, esthétisme et santé de l\'arbre avant tout.',
        image: this.IMAGES.elagage,
        features: [
          'Taille douce, éclaircie, relevée ou sanitaire',
          'Abattage directionnel & démontage par rétention',
          'Gestion du risque : proximité piscine, toiture, voirie',
          'Broyage, rognage des souches & évacuation'
        ],
        badges: ['Cordistes', 'Assuré RC Pro', 'Autorisation voirie']
      },
      {
        id: 'entretien',
        title: 'Contrats d\'entretien complet',
        description: 'Tonte, tailles, désherbage raisonné, suivi d\'arrosage, fertilisation.',
        image: this.IMAGES.entretien,
        features: [
          'Gestion de villas & domaines',
          'Arrosage & végétalisation durable',
          'Discrétion, planning souple, interlocuteur unique'
        ],
        badges: ['Contrats annuels', 'Reporting photo', 'Interventions hors saison']
      },
      {
        id: 'gros',
        title: 'Plantation / retrait de grands sujets',
        description: 'De l\'étude à l\'implantation, clés en main.',
        image: this.IMAGES.gros1,
        features: [
          'Oliviers multi-centenaires, palmiers, pins adultes',
          'Fosse, amendement, haubanage discret et durable',
          'Coordination grue, nacelle et convoi exceptionnel',
          'Transplantation & reprise (garantie de reprise en option)'
        ],
        badges: ['Grands sujets', 'Intégration paysagère', 'Garantie reprise']
      },
      {
        id: 'logistique',
        title: 'Flotte & logistique lourde',
        description: 'Camions, bennes, nacelles et grues partenaires.',
        image: this.IMAGES.flotte,
        features: [
          'Camions benne 3.5t / 7.5t, remorques et mini‑pelles',
          'Broyage sur site, évacuation en filière agréée',
          'Protection et nettoyage fin de chantier inclus'
        ],
        badges: ['Accès étroits', 'Sites d\'exception', 'Interventions rapides']
      }
    ];
  }

  getRealisations(): Realisation[] {
    return this.IMAGES.realisations.map((image, index) => ({
      id: index + 1,
      image,
      alt: `Réalisation paysagère ${index + 1}`
    }));
  }

  getContactInfo(): ContactInfo {
    return {
      phone: '04 94 00 00 00',
      email: 'contact@sainttropez‑jardins.fr',
      address: '83990 Saint‑Tropez'
    };
  }

  getOffers(): Offer[] {
    return [
      {
        id: 'essentiel',
        title: 'Essentiel',
        description: 'Pour les besoins récurrents',
        features: [
          'Visite technique & devis gratuit',
          'Interventions programmées',
          'Reporting après passage'
        ],
        buttonText: 'Demander un chiffrage',
        buttonVariant: 'outline'
      },
      {
        id: 'signature',
        title: 'Signature',
        description: 'Accompagnement premium',
        features: [
          'Chef de projet dédié',
          'Plan d\'entretien annuel',
          'Interventions hors saison sur demande'
        ],
        buttonText: 'Parler à un expert',
        buttonVariant: 'default'
      },
      {
        id: 'prestige',
        title: 'Prestige',
        description: 'Pour sites d\'exception',
        features: [
          'Plan pluriannuel sur mesure',
          'Coordination avec intendance & sécurité',
          'Confidentialité contractuelle'
        ],
        buttonText: 'Parler à un expert',
        buttonVariant: 'outline'
      }
    ];
  }

  getZones(): Zone[] {
    return [
      { name: 'Saint‑Tropez' },
      { name: 'Ramatuelle' },
      { name: 'Gassin' },
      { name: 'Grimaud' },
      { name: 'Sainte‑Maxime' },
      { name: 'Cogolin' },
      { name: 'La Croix‑Valmer' }
    ];
  }

  getHeroImage(): string {
    return this.IMAGES.hero;
  }

  getZoneImage(): string {
    return this.IMAGES.zone;
  }

  getRealisationById(id: number): RealisationDetail {
    const realisations = this.getRealisationsDetails();
    return realisations.find(r => r.id === id) || realisations[0];
  }

  getRealisationBySlug(slug: string): RealisationDetail | undefined {
    const realisations = this.getRealisationsDetails();
    return realisations.find(r => r.slug === slug);
  }

  getPreviousRealisation(currentId: number): RealisationDetail | null {
    const realisations = this.getRealisationsDetails();
    const currentIndex = realisations.findIndex(r => r.id === currentId);
    if (currentIndex > 0) {
      return realisations[currentIndex - 1];
    }
    return null;
  }

  getNextRealisation(currentId: number): RealisationDetail | null {
    const realisations = this.getRealisationsDetails();
    const currentIndex = realisations.findIndex(r => r.id === currentId);
    if (currentIndex < realisations.length - 1) {
      return realisations[currentIndex + 1];
    }
    return null;
  }

  getRealisationsDetails(): RealisationDetail[] {
    return [
      {
        id: 1,
        title: "Villa Méditerranéenne - Ramatuelle",
        subtitle: "Aménagement paysager complet d'une villa de prestige",
        description: "Ce projet exceptionnel a consisté en la création d'un jardin méditerranéen de 2000m² pour une villa de prestige située à Ramatuelle. L'aménagement intègre harmonieusement la végétation locale avec des essences exotiques, créant un écrin de verdure qui sublime l'architecture de la propriété.",
        heroImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop&crop=center",
        client: "Propriétaire privé",
        location: "Ramatuelle, Var",
        year: 2023,
        category: "Aménagement complet",
        slug: "villa-mediterraneenne-ramatuelle",
        seoTitle: "Villa Méditerranéenne - Réalisation Paysagiste Ramatuelle | Saint-Tropez Jardins",
        seoDescription: "Découvrez l'aménagement paysager complet de cette villa de prestige à Ramatuelle. Jardin méditerranéen de 2000m² avec oliviers centenaires et terrasse en pierre naturelle.",
        seoKeywords: "aménagement paysager, villa prestige, Ramatuelle, jardin méditerranéen, oliviers centenaires, terrasse pierre",
        features: [
          "Plantation de 15 oliviers centenaires",
          "Création d'une terrasse en pierre naturelle",
          "Installation d'un système d'arrosage automatique",
          "Aménagement d'un bassin d'ornement",
          "Plantation de 200 arbustes méditerranéens"
        ],
        gallery: [
          {
            id: 1,
            src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop&crop=center",
            alt: "Vue d'ensemble du jardin",
            caption: "Vue d'ensemble du jardin méditerranéen",
            thumbnail: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=200&fit=crop&crop=center"
          },
          {
            id: 2,
            src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center",
            alt: "Terrasse en pierre",
            caption: "Terrasse en pierre naturelle avec vue sur la mer",
            thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=200&fit=crop&crop=center"
          },
          {
            id: 3,
            src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop&crop=center",
            alt: "Bassin d'ornement",
            caption: "Bassin d'ornement avec plantes aquatiques",
            thumbnail: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=200&fit=crop&crop=center"
          },
          {
            id: 4,
            src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center",
            alt: "Oliviers centenaires",
            caption: "Plantation d'oliviers centenaires",
            thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=200&fit=crop&crop=center"
          },
          {
            id: 5,
            src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop&crop=center",
            alt: "Allée de cyprès",
            caption: "Allée bordée de cyprès méditerranéens",
            thumbnail: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=200&fit=crop&crop=center"
          },
          {
            id: 6,
            src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center",
            alt: "Zone de détente",
            caption: "Espace de détente avec pergola",
            thumbnail: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=200&fit=crop&crop=center"
          }
        ]
      },
      {
        id: 2,
        title: "Élagage de Pins Parasols - Saint-Tropez",
        subtitle: "Taille sanitaire et esthétique de pins centenaires",
        description: "Intervention délicate sur des pins parasols centenaires situés en bord de mer. Notre équipe de cordistes a procédé à une taille sanitaire et esthétique pour préserver ces arbres emblématiques tout en sécurisant la propriété.",
        heroImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop&crop=center",
        client: "Hôtel de luxe",
        location: "Saint-Tropez, Var",
        year: 2023,
        category: "Élagage spécialisé",
        slug: "elagage-pins-parasols-saint-tropez",
        seoTitle: "Élagage Pins Parasols Saint-Tropez - Cordistes Spécialisés | Saint-Tropez Jardins",
        seoDescription: "Élagage spécialisé de pins parasols centenaires à Saint-Tropez. Intervention en corde par nos cordistes experts pour préserver ces arbres emblématiques.",
        seoKeywords: "élagage pins parasols, Saint-Tropez, cordistes, taille sanitaire, arbres centenaires, bord de mer",
        features: [
          "Taille sanitaire de 8 pins parasols",
          "Intervention en corde pour préserver les arbres",
          "Évacuation et broyage des déchets",
          "Traitement des plaies de taille",
          "Mise en place d'un plan de suivi"
        ],
        gallery: [
          {
            id: 1,
            src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center",
            alt: "Pins parasols avant élagage",
            caption: "État des pins parasols avant intervention",
            thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=200&fit=crop&crop=center"
          },
          {
            id: 2,
            src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center",
            alt: "Cordiste en action",
            caption: "Notre cordiste en action sur les pins",
            thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=200&fit=crop&crop=center"
          },
          {
            id: 3,
            src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center",
            alt: "Résultat après élagage",
            caption: "Résultat après élagage sanitaire",
            thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=200&fit=crop&crop=center"
          }
        ]
      },
      {
        id: 3,
        title: "Fréjus, villa de prestige",
        subtitle: "Taille sanitaire et esthétique de pins centenaires",
        description: "Intervention délicate sur des pins parasols centenaires situés en bord de mer. Notre équipe de cordistes a procédé à une taille sanitaire et esthétique pour préserver ces arbres emblématiques tout en sécurisant la propriété.",
        heroImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop&crop=center",
        client: "Hôtel de luxe",
        location: "Saint-Tropez, Var",
        year: 2023,
        category: "Élagage spécialisé",
        slug: "villa-de-prestige-frejus",
        seoTitle: "Élagage Pins Parasols Saint-Tropez - Cordistes Spécialisés | Saint-Tropez Jardins",
        seoDescription: "Élagage spécialisé de pins parasols centenaires à Saint-Tropez. Intervention en corde par nos cordistes experts pour préserver ces arbres emblématiques.",
        seoKeywords: "élagage pins parasols, Saint-Tropez, cordistes, taille sanitaire, arbres centenaires, bord de mer",
        features: [
          "Taille sanitaire de 8 pins parasols",
          "Intervention en corde pour préserver les arbres",
          "Évacuation et broyage des déchets",
          "Traitement des plaies de taille",
          "Mise en place d'un plan de suivi"
        ],
        gallery: [
          {
            id: 1,
            src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center",
            alt: "Pins parasols avant élagage",
            caption: "État des pins parasols avant intervention",
            thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=200&fit=crop&crop=center"
          },
          {
            id: 2,
            src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center",
            alt: "Cordiste en action",
            caption: "Notre cordiste en action sur les pins",
            thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=200&fit=crop&crop=center"
          },
          {
            id: 3,
            src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center",
            alt: "Résultat après élagage",
            caption: "Résultat après élagage sanitaire",
            thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=200&fit=crop&crop=center"
          }
        ]
      }
    ];
  }
}
