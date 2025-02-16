import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-permanent',
  templateUrl: './permanent.component.html',
  styleUrls: ['./permanent.component.scss']
})
export class PermanentComponent implements OnInit {

  constructor(public bookService: BookService) { }

  ngOnInit(): void {
    document.querySelectorAll('mat-card.prestation.mat-card').forEach(item => {
        item.addEventListener('click', this.bookService.openPlanity)
    })
  }

}
