import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private comments: { [postId: number]: string[] } = {};

  getCommentsByPostId(postId: number): string[] {
    return this.comments[postId] || [];
  }

  addComment(postId: number, comment: string): void {
    if (!this.comments[postId]) {
      this.comments[postId] = [];
    }
    this.comments[postId].push(comment);
  }
}
