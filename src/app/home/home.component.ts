import { Component, OnInit } from '@angular/core';
import { BookService } from './../book.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public bookService: BookService) { }

  ngOnInit() {
  }

}

