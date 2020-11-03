import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-creations",
  templateUrl: "./creations.component.html",
  styleUrls: ["./creations.component.scss"],
})
export class CreationsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    var i,
      e,
      d = document,
      s = "script";
    i = d.createElement("script");
    i.async = 1;
    i.src =
      "https://cdn.curator.io/published/27c72be9-3dd0-4408-8763-ac264862c68c.js";
    e = d.getElementsByTagName(s)[0];
    e.parentNode.insertBefore(i, e);
  }
}
