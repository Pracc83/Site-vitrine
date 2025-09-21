import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Zone } from '../../models/jardin.models';

@Component({
  selector: 'app-zone',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './zone.html',
  styleUrls: ['./zone.scss']
})
export class ZoneComponent {
  @Input() zones!: Zone[];
  @Input() zoneImage!: string;
}