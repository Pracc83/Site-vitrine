import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RealisationDetail } from '../../models/jardin.models';

@Component({
  selector: 'app-realisations',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './realisations.html',
  styleUrls: ['./realisations.scss']
})
export class RealisationsComponent {
  @Input() realisations!: RealisationDetail[];
}