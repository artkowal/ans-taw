import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlogComponent } from './components/blog/blog.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { DataService } from './services/data.service';


@Component({
 selector: 'app-root',
 standalone: true,
 imports: [RouterOutlet, BlogComponent, GalleryComponent, AddPostComponent],
 providers: [DataService],
 templateUrl: './app.component.html',
 styleUrl: './app.component.css'
})



export class AppComponent {

 public counter: number = 0;

 add() {
   this.counter++;
 }

 remove() {
   this.counter--;
 }

}