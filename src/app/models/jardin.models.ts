export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  badges: string[];
}

export interface Realisation {
  id: number;
  image: string;
  alt: string;
  slug?: string;
}

export interface RealisationDetail {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  gallery: GalleryImage[];
  client: string;
  location: string;
  year: number;
  category: string;
  features: string[];
  slug: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  caption?: string;
  thumbnail?: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
  buttonVariant: 'default' | 'outline';
}

export interface Zone {
  name: string;
}

export interface BrandInfo {
  name: string;
  subtitle: string;
  icon: string;
}
