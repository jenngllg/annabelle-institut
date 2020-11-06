import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-slimming',
  templateUrl: './slimming.component.html',
  styleUrls: ['./slimming.component.scss']
})
export class SlimmingComponent implements OnInit {

  constructor(public bookService: BookService) { }

  ngOnInit() {
  }

}
