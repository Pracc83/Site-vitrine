import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactInfo } from '../../models/jardin.models';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class ContactComponent {
  @Input() contactInfo!: ContactInfo;
}