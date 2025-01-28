import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private comments: { [postId: string]: string[] } = {};

  getCommentsByPostId(postId: string): string[] {
    return this.comments[postId] || [];
  }

  addComment(postId: string, comment: string): void {
    if (!this.comments[postId]) {
      this.comments[postId] = [];
    }
    this.comments[postId].push(comment);
  }
}
