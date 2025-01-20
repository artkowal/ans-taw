import { Component, OnInit } from '@angular/core';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { BlogComponent } from '../blog/blog.component';
import { FilterTextPipe } from '../../pipes/filter-text.pipe';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'blog-home',
  standalone: true,
  imports: [SearchBarComponent, BlogComponent, CommonModule],
  providers: [DataService],
  templateUrl: './blog-home.component.html',
  styleUrl: './blog-home.component.css'
})
export class BlogHomeComponent implements OnInit {

  public filterText: string = '';
  public posts: any[] = [];

  constructor(private dataService: DataService){}

  ngOnInit(): void {
  }

  getName($event: string): void {
    this.filterText = $event;
  }
}
