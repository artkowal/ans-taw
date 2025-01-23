import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'blog-item-details',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './blog-item-details.component.html',
  styleUrl: './blog-item-details.component.css'
})
export class BlogItemDetailsComponent implements OnInit {
  public id: string = "";
  public title: string = "Tytuł";
  public text: string = "";
  public image: string = "";

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('_id');
      console.log('Debug ID from URL:', id); 
      if (id) {
        this.dataService.getById(id).subscribe(
          (res: any) => {
            console.log('Response from API:', res);
            if (Array.isArray(res) && res.length > 0) {
              this.title = res[0]['title'] || 'Default Title';
              this.text = res[0]['text'] || 'Default Text';
              this.image = res[0]['image'] || 'assets/default-image.jpg';
            } else {
              console.error('Unexpected API response format or empty data.');
            }
          },
          (error) => {
            console.error('Error fetching data:', error);
          }
        );
      }
    });
  }

  navigateToBlog() {
    this.router.navigate(['/blog']);
  }
}
