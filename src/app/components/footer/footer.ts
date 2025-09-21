import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandInfo, ContactInfo } from '../../models/jardin.models';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss']
})
export class FooterComponent {
  @Input() brandInfo!: BrandInfo;
  @Input() contactInfo!: ContactInfo;
  @Output() tabChange = new EventEmitter<string>();

  get currentYear(): number {
    return new Date().getFullYear();
  }

  onTabChange(tab: string) {
    this.tabChange.emit(tab);
  }
}