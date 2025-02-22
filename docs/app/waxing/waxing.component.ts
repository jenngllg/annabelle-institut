import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-waxing',
  templateUrl: './waxing.component.html',
  styleUrls: ['./waxing.component.scss']
})
export class WaxingComponent implements OnInit {

  constructor(public bookService: BookService) { }

  ngOnInit(): void {
    document.querySelectorAll('mat-card.prestation.mat-card').forEach(item => {
        item.addEventListener('click', this.bookService.openPlanity)
    })
  }

}
