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
export class GalleryComponent implements OnInit{
  public images: string[] = [];
  public selectedImage: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getAll().subscribe({
      next: (posts: any) => {
        this.images = posts.map((post: any) => post.image);
      },
      error: (err) => {
        console.error("Błąd pobierania", err);
      }
    });
  }

  openImage(image: string) {
    this.selectedImage = image;
    const modal = new bootstrap.Modal(document.getElementById('imageModal'));
    modal.show();
  }
}
