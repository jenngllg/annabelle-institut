import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-face-care',
  templateUrl: './face-care.component.html',
  styleUrls: ['./face-care.component.scss']
})
export class FaceCareComponent implements OnInit {

  constructor(public bookService: BookService) { }

  ngOnInit(): void {
    document.querySelectorAll('mat-card.prestation.mat-card').forEach(item => {
        item.addEventListener('click', this.bookService.openPlanity)
    })
  }
}
