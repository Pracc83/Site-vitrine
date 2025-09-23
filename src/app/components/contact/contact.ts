import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactInfo } from '../../models/jardin.models';
import { MapComponent } from '../map/map';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, MapComponent],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class ContactComponent {
  @Input() contactInfo!: ContactInfo;
}