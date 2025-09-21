import { Component, Input, Output, EventEmitter, HostListener, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss']
})
export class HeroComponent implements OnInit, OnDestroy {
  @Input() heroImage!: string;
  @Output() scrollTo = new EventEmitter<string>();

  private scrollListener?: () => void;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.setupParallax();
  }

  ngOnDestroy() {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  private setupParallax() {
    this.scrollListener = () => {
      const scrolled = window.pageYOffset;
      const parallaxElement = this.elementRef.nativeElement.querySelector('.parallax-bg');
      if (parallaxElement) {
        const speed = 0.5;
        parallaxElement.style.transform = `translateY(${scrolled * speed}px)`;
      }
    };
    
    window.addEventListener('scroll', this.scrollListener);
  }

  onScrollTo(section: string) {
    this.scrollTo.emit(section);
  }
}