import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Offer } from '../../models/jardin.models';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './offers.html',
  styleUrls: ['./offers.scss']
})
export class OffersComponent {
  @Input() offers!: Offer[];
}