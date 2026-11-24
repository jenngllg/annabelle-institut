import { Component, OnInit } from "@angular/core";

export interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  permalink: string;
  timestamp: string;
  video: boolean;
}

// Generated at build time by scripts/fetch-instagram.js and served with the site:
// no third-party script, no cookie.
const FEED_URL = "assets/instagram/feed.json";

@Component({
  selector: "app-creations",
  templateUrl: "./creations.component.html",
  styleUrls: ["./creations.component.scss"],
})
export class CreationsComponent implements OnInit {
  readonly instagramUrl = "https://www.instagram.com/annabelle_institut_colmar/";
  posts: InstagramPost[] = [];
  loading = true;

  ngOnInit() {
    fetch(FEED_URL)
      .then(res => (res.ok ? res.json() : []))
      .then((posts: InstagramPost[]) => (this.posts = Array.isArray(posts) ? posts : []))
      .catch(() => (this.posts = []))
      .then(() => (this.loading = false));
  }

  altText(post: InstagramPost): string {
    const text = post.caption.split("\n")[0].replace(/#\S+/g, "").trim();
    // Emoji-only captions make a useless alt text: fall back to a generic description.
    return /[a-zA-ZÀ-ÿ]{3}/.test(text) ? text.slice(0, 120) : "Réalisation de l'institut Anna'Belle";
  }
}
