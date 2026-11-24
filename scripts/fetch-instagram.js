/*
 * Fetches the latest Instagram posts at build time and stores them with the site,
 * so the "Réalisations" page shows them without any third-party script or cookie.
 *
 * Environment variables:
 *   INSTAGRAM_TOKEN    access token (secret)
 *   INSTAGRAM_USER_ID  Instagram professional account ID. When set, the Graph API with
 *                      Facebook / unified login is used (graph.facebook.com, e.g. a system
 *                      user token that never expires). When empty, the token is treated as
 *                      an Instagram Login token (graph.instagram.com/me).
 *
 * Output (both git-ignored, regenerated on every build):
 *   docs/assets/instagram/feed.json   list of posts (image, caption, permalink, date)
 *   docs/assets/instagram/<id>.jpg    downloaded images
 *
 * Without a token, or if the API fails, it writes an empty feed and exits 0: the page
 * then only shows a link to the Instagram account, and the deploy is not blocked.
 *
 * Usage: INSTAGRAM_TOKEN=... node scripts/fetch-instagram.js [limit]   (default: 24)
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'docs/assets/instagram');
const limit = parseInt(process.argv[2], 10) || 24;
const token = process.env.INSTAGRAM_TOKEN;
const userId = (process.env.INSTAGRAM_USER_ID || '').trim();
const API = userId ? 'https://graph.facebook.com/v21.0' : 'https://graph.instagram.com/v21.0';
const account = userId ? encodeURIComponent(userId) : 'me';

function get(url, redirects) {
  redirects = redirects || 0;
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && redirects < 5) {
        res.resume();
        resolve(get(new URL(res.headers.location, url).toString(), redirects + 1));
        return;
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const body = Buffer.concat(chunks);
        if (res.statusCode !== 200) {
          // Never echo the URL: it carries the access token.
          reject(new Error('HTTP ' + res.statusCode + ': ' + body.toString('utf8').slice(0, 300)));
        } else {
          resolve(body);
        }
      });
    }).on('error', reject);
  });
}

async function getJson(url) {
  return JSON.parse((await get(url)).toString('utf8'));
}

function writeFeed(posts) {
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'feed.json'), JSON.stringify(posts, null, 2));
}

function warn(message) {
  // "::warning::" shows up as an annotation on the GitHub Actions run.
  console.warn((process.env.GITHUB_ACTIONS ? '::warning::' : 'Warning: ') + message);
}

async function main() {
  if (!token) {
    warn('INSTAGRAM_TOKEN is not set: the Instagram gallery will be empty.');
    writeFeed([]);
    return;
  }

  const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';
  const posts = [];
  let url = `${API}/${account}/media?fields=${fields}&limit=${Math.min(limit, 50)}&access_token=${encodeURIComponent(token)}`;

  while (url && posts.length < limit) {
    const page = await getJson(url);
    posts.push(...(page.data || []));
    url = page.paging && page.paging.next;
  }

  // Start from a clean folder so deleted posts disappear.
  if (fs.existsSync(outDir)) {
    (fs.rmSync || fs.rmdirSync)(outDir, { recursive: true });
  }
  fs.mkdirSync(outDir, { recursive: true });

  const feed = [];
  for (const post of posts.slice(0, limit)) {
    // Videos (reels) only expose their cover image; albums expose their first image.
    const imageUrl = post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url;
    if (!imageUrl) {
      continue;
    }
    try {
      const file = `${post.id}.jpg`;
      fs.writeFileSync(path.join(outDir, file), await get(imageUrl));
      feed.push({
        id: post.id,
        image: `assets/instagram/${file}`,
        caption: (post.caption || '').trim(),
        permalink: post.permalink,
        timestamp: post.timestamp,
        video: post.media_type === 'VIDEO',
      });
    } catch (e) {
      warn(`Image of post ${post.id} skipped: ${e.message}`);
    }
  }

  writeFeed(feed);
  console.log(`Instagram: ${feed.length} posts saved to docs/assets/instagram/`);
}

main().catch(e => {
  warn('Instagram feed not updated: ' + e.message);
  writeFeed([]);
});
