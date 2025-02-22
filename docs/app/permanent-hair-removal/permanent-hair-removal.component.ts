import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-permanent-hair-removal',
  templateUrl: './permanent-hair-removal.component.html',
  styleUrls: ['./permanent-hair-removal.component.scss']
})
export class PermanentHairRemovalComponent implements OnInit {

  constructor(public bookService: BookService) { }

  ngOnInit(): void {
    document.querySelectorAll('mat-card.prestation.mat-card').forEach(item => {
        item.addEventListener('click', this.bookService.openPlanity)
    })
  }
}