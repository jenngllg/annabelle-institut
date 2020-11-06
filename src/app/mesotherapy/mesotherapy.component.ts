import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-mesotherapy',
  templateUrl: './mesotherapy.component.html',
  styleUrls: ['./mesotherapy.component.scss']
})
export class MesotherapyComponent implements OnInit {

  constructor(public bookService: BookService) { }

  ngOnInit() {
  }

}
