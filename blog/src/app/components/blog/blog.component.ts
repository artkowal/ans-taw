import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {BlogItemComponent} from "../blog-item/blog-item.component";
import {CommonModule} from "@angular/common";
import { CommentsService } from '../../services/comments.service';
import { CommentsSectionComponent } from '../comments-section/comments-section.component';
import { AddPostComponent } from '../add-post/add-post.component';
import { GalleryComponent } from '../gallery/gallery.component';



@Component({
  selector: 'blog',
  standalone: true,
  imports: [BlogItemComponent, CommonModule, CommentsSectionComponent, AddPostComponent, GalleryComponent],
  providers: [DataService, CommentsService],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})

export class BlogComponent implements OnInit{
  public items: any;

  constructor(private service: DataService) {
  }

  ngOnInit() {
    this.items = this.service.getAll();
  }

  refreshPosts() {
    this.items = this.service.getAll();
  }
}
