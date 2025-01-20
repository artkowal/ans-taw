import {Component, OnInit, Input} from '@angular/core';
import {DataService} from "../../services/data.service";
import {BlogItemComponent} from "../blog-item/blog-item.component";
import {CommonModule} from "@angular/common";
import { HttpClientModule } from '@angular/common/http';
import { FilterTextPipe } from '../../pipes/filter-text.pipe';



@Component({
  selector: 'blog',
  standalone: true,
  imports: [HttpClientModule, BlogItemComponent, CommonModule, FilterTextPipe],
  providers: [DataService],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})

export class BlogComponent implements OnInit{

  @Input() filterText: string = '';

  public items$: any;

  constructor(private service: DataService) {
  }

  ngOnInit() {
    this.getPosts();
  }

  getAll(){
    this.service.getAll().subscribe(response => {
      this.items$ = response;
    });
  }

  refreshPosts(){
    this.getPosts();
  }

  private getPosts() {
    setTimeout(() => {
      this.service.getAll().subscribe(items => {
        this.items$ = items;

      });
    }, 1000)
  }
}

