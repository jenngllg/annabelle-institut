import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openPlanity() {
    window.open("https://www.planity.com/anna-belle-institut-68000-colmar", "_blank"); 
  }
}

