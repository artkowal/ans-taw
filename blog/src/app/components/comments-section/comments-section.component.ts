import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommentsService } from '../../services/comments.service'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'comments-section',
  imports: [CommonModule, FormsModule],
  templateUrl: './comments-section.component.html',
  styleUrl: './comments-section.component.css'
})

export class CommentsSectionComponent {
  @Input() postId!: string;
  commentText: string = '';

  constructor(public commentsService: CommentsService) {}

  addComment() {
    console.log('Adding comment to postId:', this.postId);
    if (this.commentText.trim()){
      this.commentsService.addComment(this.postId, this.commentText);
      this.commentText = '';
    }
  }

  getComments(){
    return this.commentsService.getCommentsByPostId(this.postId);
  }
}
