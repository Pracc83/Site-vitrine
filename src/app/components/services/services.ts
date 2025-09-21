import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Service } from '../../models/jardin.models';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.html',
  styleUrls: ['./services.scss']
})
export class ServicesComponent {
  @Input() services!: Service[];
  @Input() activeTab: string = 'elagage';
  @Output() tabChange = new EventEmitter<string>();

  onTabChange(tab: string) {
    this.tabChange.emit(tab);
  }

  getServiceById(id: string): Service | undefined {
    return this.services.find(service => service.id === id);
  }
}