import { Component, Input } from '@angular/core';
import { SummaryPipe } from '../../pipes/summary.pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'blog-item-text',
  imports: [SummaryPipe, RouterModule],
  templateUrl: './blog-item-text.component.html',
  styleUrl: './blog-item-text.component.css'
})
export class BlogItemTextComponent {
  @Input() title?: string;
  @Input() text?: string;
  @Input() id?: number;
}
