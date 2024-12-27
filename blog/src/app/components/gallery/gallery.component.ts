import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

declare var bootstrap: any; // Deklaracja Bootstrap dla TypeScript

@Component({
  selector: 'gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnInit {
  public images: string[] = [];
  public selectedImage: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.images = this.dataService.getAll().map(post => post.image);
  }

  openImage(image: string) {
    this.selectedImage = image;
    const modal = new bootstrap.Modal(document.getElementById('imageModal'));
    modal.show();
  }
}
