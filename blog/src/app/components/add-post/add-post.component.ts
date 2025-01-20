import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'add-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent {
  @Output() postAdded = new EventEmitter<void>();

  public newPost = {
    title: '',
    text: '',
    image: '',
  };

  public selectedFile: File | null = null;

  constructor(private dataService: DataService) {}

  addPost(event: Event) {
    event.preventDefault();
    if (this.newPost.title.trim() && this.newPost.text.trim()) {
      this.dataService.addPost(this.newPost.title.trim(), this.newPost.text.trim(), this.newPost.image.trim())
        .subscribe({
          next: () => {
            alert('Post wysłany pomyślnie');
            this.newPost = { title: '', text: '', image: '' };  // Resetowanie formularza po dodaniu posta
            this.postAdded.emit();  // Emitowanie eventu po dodaniu posta
          },
          error: (err) => {
            console.error('Błąd podczas wysyłania postu:', err);  // Obsługa błędów
          }
        });
    }
  }
}
