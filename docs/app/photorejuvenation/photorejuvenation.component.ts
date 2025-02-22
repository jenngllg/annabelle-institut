import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-photorejuvenation',
  templateUrl: './photorejuvenation.component.html',
  styleUrls: ['./photorejuvenation.component.scss']
})
export class PhotorejuvenationComponent implements OnInit {

  constructor(public bookService: BookService) { }

  ngOnInit(): void {
    document.querySelectorAll('mat-card.prestation.mat-card').forEach(item => {
      item.addEventListener('click', this.bookService.openPlanity)
    })
  }

}
