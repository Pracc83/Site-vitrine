import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-seo-meta',
  standalone: true,
  imports: [CommonModule],
  template: ''
})
export class SEOMetaComponent implements OnInit {
  @Input() pageTitle?: string;
  @Input() description?: string;
  @Input() keywords?: string;
  @Input() image?: string;
  @Input() url?: string;
  @Input() type?: string = 'website';

  constructor(
    private meta: Meta,
    private titleService: Title
  ) {}

  ngOnInit() {
    if (this.pageTitle) {
      this.titleService.setTitle(this.pageTitle);
    }
    
    if (this.description) {
      this.meta.updateTag({ name: 'description', content: this.description });
    }
    
    if (this.keywords) {
      this.meta.updateTag({ name: 'keywords', content: this.keywords });
    }
    
    if (this.image) {
      this.meta.updateTag({ property: 'og:image', content: this.image });
      this.meta.updateTag({ property: 'twitter:image', content: this.image });
    }
    
    if (this.url) {
      this.meta.updateTag({ property: 'og:url', content: this.url });
      this.meta.updateTag({ property: 'twitter:url', content: this.url });
    }
    
    if (this.type) {
      this.meta.updateTag({ property: 'og:type', content: this.type });
    }
  }
}
