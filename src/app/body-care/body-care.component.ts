import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-body-care',
  templateUrl: './body-care.component.html',
  styleUrls: ['./body-care.component.scss']
})
export class BodyCareComponent implements OnInit {

  constructor(public bookService: BookService) { }

  ngOnInit() {
  }

}
