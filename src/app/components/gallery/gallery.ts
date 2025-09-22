import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxGalleryModule, NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { GalleryImage } from '../../models/jardin.models';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, NgxGalleryModule],
  templateUrl: './gallery.html',
  styleUrls: ['./gallery.scss']
})
export class GalleryComponent implements OnInit {
  @Input() images: GalleryImage[] = [];

  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  ngOnInit() {
    // Configuration de la galerie
    this.galleryOptions = [
      {
        width: '100%',
        height: '600px',
        thumbnailsColumns: 4,
        thumbnailsRows: 1,
        thumbnailsPercent: 25,
        thumbnailMargin: 10,
        thumbnailSize: 'cover',
        imageAnimation: NgxGalleryAnimation.Slide,
        imageSize: 'cover',
        imageArrows: true,
        imageArrowsAutoHide: false,
        imageSwipe: true,
        thumbnailsArrows: true,
        thumbnailsSwipe: true,
        thumbnailsAutoHide: false,
        thumbnailsRemainingCount: true,
        thumbnailsMargin: 20,
        previewCloseOnClick: true,
        previewCloseOnEsc: true,
        previewKeyboardNavigation: true,
        previewZoom: true,
        previewZoomStep: 0.1,
        previewZoomMax: 2,
        previewZoomMin: 0.5,
        previewRotate: true,
        previewDownload: true,
        previewFullscreen: true,
        previewForceFullscreen: false,
        previewArrows: true,
        previewArrowsAutoHide: false,
        previewSwipe: true,
        previewBullets: true,
        arrowPrevIcon: 'fa fa-arrow-circle-left',
        arrowNextIcon: 'fa fa-arrow-circle-right',
        imageBullets: true,
        imageAutoPlay: false,
        imageAutoPlayPauseOnHover: true,
        imageAutoPlayInterval: 3000,
        imageInfinityMove: true,
        imageActions: [
          {
            icon: 'fa fa-download',
            onClick: this.downloadImage.bind(this),
            titleText: 'Télécharger'
          }
        ]
      },
      // Configuration pour mobile
      {
        breakpoint: 768,
        width: '100%',
        height: '400px',
        thumbnailsColumns: 3,
        thumbnailsRows: 1,
        thumbnailsPercent: 30,
        thumbnailMargin: 8,
        imageSwipe: true,
        thumbnailsSwipe: true,
        imageArrows: true,
        thumbnailsArrows: true,
        previewArrows: true,
        previewSwipe: true,
      },
      // Configuration pour très petits écrans
      {
        breakpoint: 480,
        width: '100%',
        height: '300px',
        thumbnailsColumns: 2,
        thumbnailsRows: 1,
        thumbnailsPercent: 40,
        thumbnailMargin: 5,
        imageSwipe: true,
        thumbnailsSwipe: true,
        imageArrows: true,
        thumbnailsArrows: true,
        previewArrows: true,
        previewSwipe: true,
      }
    ];

    // Conversion des images pour ngx-gallery
    this.galleryImages = this.images.map(image => ({
      small: image.thumbnail || image.src,
      medium: image.src,
      big: image.src,
      description: image.caption || image.alt,
      alt: image.alt
    }));
  }

  downloadImage(event: any, index: number) {
    const image = this.galleryImages[index];
    if (image && image.big) {
      const link = document.createElement('a');
      link.href = image.big as string;
      link.download = `image-${index + 1}.jpg`;
      link.click();
    }
  }
}