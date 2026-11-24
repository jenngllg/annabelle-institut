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
 *   src/assets/instagram/feed.json   list of posts (image, caption, permalink, date)
 *   src/assets/instagram/<id>.webp   images reduced to 640 px (or <id>.jpg, original size,
 *                                     when the optional "sharp" package is not installed)
 *
 * Without a token, or if the API fails, the previous gallery is kept (in CI: the one currently
 * online, restored from gh-pages by the workflow) and the script exits with code 1, so that
 * the workflow, after deploying, marks the run as failed and GitHub sends an e-mail.
 *
 * Usage: INSTAGRAM_TOKEN=... node scripts/fetch-instagram.js [limit]   (default: 24)
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

// Optional: reduces Instagram's full-size photos (up to 4000 px, ~700 KB each) to 640 px WebP.
// Installed in CI only (npm install --no-save sharp); without it, originals are kept.
let sharp = null;
try {
  sharp = require('sharp');
} catch (e) {
  sharp = null;
}
const MAX_SIZE = 640;

async function saveImage(buffer, id, dir) {
  if (sharp) {
    const file = `${id}.webp`;
    await sharp(buffer)
      .rotate()
      .resize(MAX_SIZE, MAX_SIZE, { fit: 'cover', withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(path.join(dir, file));
    return file;
  }
  const file = `${id}.jpg`;
  fs.writeFileSync(path.join(dir, file), buffer);
  return file;
}

const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'src/assets/instagram');
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

function writeFeed(dir, posts) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'feed.json'), JSON.stringify(posts, null, 2));
}

function warn(message) {
  // "::warning::" shows up as an annotation on the GitHub Actions run.
  console.warn((process.env.GITHUB_ACTIONS ? '::warning::' : 'Warning: ') + message);
}

function removeDir(dir) {
  if (fs.existsSync(dir)) {
    (fs.rmSync || fs.rmdirSync)(dir, { recursive: true });
  }
}

// On failure, keep the gallery already in src/assets/instagram (in CI: the one currently
// online, restored from the gh-pages branch by the workflow) instead of emptying the page.
function keepPreviousFeed(reason) {
  const feedFile = path.join(outDir, 'feed.json');
  if (fs.existsSync(feedFile)) {
    warn(`${reason} The previous gallery is kept.`);
  } else {
    warn(`${reason} No previous gallery: the page will only show a link to Instagram.`);
    writeFeed(outDir, []);
  }
}

async function main() {
  if (!token) {
    keepPreviousFeed('INSTAGRAM_TOKEN is not set.');
    // In CI a missing token is an error (the run fails so that an e-mail is sent).
    if (process.env.GITHUB_ACTIONS) {
      process.exitCode = 1;
    }
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

  // Download into a temporary folder, then swap: the previous gallery stays in place
  // until the new one is complete (deleted posts disappear at the swap).
  const tmpDir = outDir + '.tmp';
  removeDir(tmpDir);
  fs.mkdirSync(tmpDir, { recursive: true });
  const previousOutDir = outDir;

  const feed = [];
  for (const post of posts.slice(0, limit)) {
    // Videos (reels) only expose their cover image; albums expose their first image.
    const imageUrl = post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url;
    if (!imageUrl) {
      continue;
    }
    try {
      const file = await saveImage(await get(imageUrl), post.id, tmpDir);
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

  if (!feed.length) {
    removeDir(tmpDir);
    throw new Error('Instagram returned no usable post.');
  }

  writeFeed(tmpDir, feed);
  removeDir(previousOutDir);
  fs.renameSync(tmpDir, outDir);
  console.log(`Instagram: ${feed.length} posts saved to src/assets/instagram/`);
}

main().catch(e => {
  keepPreviousFeed('Instagram feed not updated: ' + e.message + '.');
  // Fail the step: the workflow still deploys the site, then marks the run as failed
  // (GitHub e-mails the repository owner) so that the token can be renewed.
  process.exitCode = 1;
});
