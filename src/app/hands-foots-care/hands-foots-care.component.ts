import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-hands-foots-care',
  templateUrl: './hands-foots-care.component.html',
  styleUrls: ['./hands-foots-care.component.scss']
})
export class HandsFootsCareComponent implements OnInit {

  constructor(public bookService: BookService) { }

  ngOnInit(): void {
    document.querySelectorAll('mat-card.prestation.mat-card').forEach(item => {
        item.addEventListener('click', this.bookService.openPlanity)
    })
  }

}
