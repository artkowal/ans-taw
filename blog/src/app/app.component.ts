import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GalleryComponent } from "./components/gallery/gallery.component";
import { AddPostComponent } from "./components/add-post/add-post.component";
import { NavbarComponent } from "./components/navbar/navbar.component";

@Component({
 selector: 'app-root',
 standalone: true,
 imports: [RouterOutlet, GalleryComponent, AddPostComponent, NavbarComponent],
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