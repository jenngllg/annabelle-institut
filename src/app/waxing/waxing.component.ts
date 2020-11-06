import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-waxing',
  templateUrl: './waxing.component.html',
  styleUrls: ['./waxing.component.scss']
})
export class WaxingComponent implements OnInit {

  constructor(public bookService: BookService) { }

  ngOnInit() {
  }

}
