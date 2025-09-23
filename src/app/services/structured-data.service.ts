import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StructuredDataService {

  generateLocalBusiness(): any {
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Saint-Tropez Gardens",
      "description": "Création et entretien de jardins de luxe à Saint-Tropez. Paysagiste professionnel spécialisé dans les jardins méditerranéens.",
      "url": "https://mon-projet-angular-3h0zgfnce-pracc83s-projects.vercel.app",
      "telephone": "+33-4-94-XX-XX-XX",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Rue de la Liberté",
        "addressLocality": "Saint-Tropez",
        "postalCode": "83990",
        "addressCountry": "FR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "43.2694",
        "longitude": "6.6392"
      },
      "openingHours": "Mo-Fr 08:00-18:00",
      "priceRange": "€€€",
      "image": "https://saint-tropez-jardins.fr/assets/images/og-image.jpg",
      "sameAs": [
        "https://www.facebook.com/sainttropezjardins",
        "https://www.instagram.com/sainttropezjardins"
      ],
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": "43.2694",
          "longitude": "6.6392"
        },
        "geoRadius": "50000"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Services de jardinage",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Création de jardins",
              "description": "Conception et réalisation de jardins sur mesure"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Entretien de jardins",
              "description": "Maintenance et entretien régulier de vos espaces verts"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Paysagisme",
              "description": "Aménagement paysager et design extérieur"
            }
          }
        ]
      }
    };
  }

  generateService(serviceName: string, description: string): any {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": serviceName,
      "description": description,
      "provider": {
        "@type": "LocalBusiness",
        "name": "Saint-Tropez Gardens",
        "url": "https://mon-projet-angular-3h0zgfnce-pracc83s-projects.vercel.app"
      },
      "areaServed": {
        "@type": "City",
        "name": "Saint-Tropez"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": serviceName,
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": serviceName,
              "description": description
            }
          }
        ]
      }
    };
  }

  generateBreadcrumbList(items: Array<{name: string, url: string}>): any {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": `https://mon-projet-angular-3h0zgfnce-pracc83s-projects.vercel.app${item.url}`
      }))
    };
  }

  generateFAQ(faqs: Array<{question: string, answer: string}>): any {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  }
}
