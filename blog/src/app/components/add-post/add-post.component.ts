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
    image: 'https://via.placeholder.com/150',
  };

  public selectedFile: File | null = null;

  constructor(private dataService: DataService) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newPost.image = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      alert('Proszę wybrać plik graficzny (jpg, png, gif itp.)');
      this.selectedFile = null;
    }
  }

  addPost() {
    if (!this.newPost.title.trim() || !this.newPost.text.trim()) {
      alert('Tytuł i treść posta są wymagane!');
      return;
    }

    if (!this.selectedFile) {
      this.newPost.image = 'https://via.placeholder.com/150';
    }

    this.dataService.addPost(this.newPost);

    this.newPost = {
      title: '',
      text: '',
      image: 'https://via.placeholder.com/150',
    };
    this.selectedFile = null;

    this.postAdded.emit();
  }
}
