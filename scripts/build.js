/*
 * Build du site statique (aucune dépendance, Node 12+).
 *
 *   src/layout.html          gabarit commun (en-tête, menu, pied de page)
 *   src/pages/<page>.html    contenu de chaque page
 *   src/seo-routes.json      URL, titre, description de chaque page
 *   src/assets, css, js      copiés tels quels
 *
 * Produit dist/ prêt pour GitHub Pages :
 *   - index.html et <route>.html (GitHub Pages sert /waxing depuis waxing.html, en HTTP 200)
 *   - 404.html, sitemap.xml, robots.txt, CNAME, .nojekyll
 *
 * Directives dans les pages :
 *   <!-- build: include <page> -->     insère le contenu d'une autre page (flyer)
 *   <!-- build: instagram-gallery -->  galerie générée depuis src/assets/instagram/feed.json
 *                                      (écrit par scripts/fetch-instagram.js)
 *
 * Usage : node scripts/build.js
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '..');
const src = path.join(root, 'src');
const dist = path.join(root, 'dist');

const config = JSON.parse(fs.readFileSync(path.join(src, 'seo-routes.json'), 'utf8'));
const baseUrl = config.baseUrl.replace(/\/+$/, '');
const routes = config.routes;
const home = routes.find(r => r.path === '');
const layout = fs.readFileSync(path.join(src, 'layout.html'), 'utf8');

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function urlFor(p) {
  return baseUrl + '/' + p;
}

function readPage(name) {
  return fs.readFileSync(path.join(src, 'pages', name + '.html'), 'utf8');
}

function instagramGallery() {
  const feedFile = path.join(src, 'assets', 'instagram', 'feed.json');
  let posts = [];
  try {
    posts = JSON.parse(fs.readFileSync(feedFile, 'utf8'));
  } catch (e) {
    posts = [];
  }
  if (!Array.isArray(posts) || !posts.length) {
    return '<p class="feed-empty">Retrouvez toutes nos réalisations sur Instagram.</p>';
  }
  const items = posts.map((post, index) => {
    const firstLine = String(post.caption || '').split('\n')[0].replace(/#\S+/g, '').trim();
    const alt = firstLine ? firstLine.slice(0, 120) : "Réalisation de l'institut Anna'Belle";
    const badge = post.video
      ? '<svg class="icon video-badge" aria-hidden="true"><use href="/assets/icons.svg#play"></use></svg>'
      : '';
    return `    <a class="post" href="${escapeHtml(post.permalink)}" target="_blank" rel="noopener" title="${escapeHtml(alt)}">
        <img src="/${escapeHtml(post.image)}" alt="${escapeHtml(alt)}" width="320" height="320"${index < 3 ? (index === 0 ? ' fetchpriority="high"' : '') : ' loading="lazy"'}>${badge}
    </a>`;
  });
  return '<div class="gallery">\n' + items.join('\n') + '\n</div>';
}

function renderContent(name) {
  return readPage(name)
    .replace(/<!-- build: include ([a-z-]+) -->/g, (m, other) => readPage(other))
    .replace('<!-- build: instagram-gallery -->', () => instagramGallery());
}

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const a = path.join(from, entry.name);
    const b = path.join(to, entry.name);
    if (entry.isDirectory()) {
      copyDir(a, b);
    } else {
      fs.copyFileSync(a, b);
    }
  }
}

function write(relPath, content) {
  const file = path.join(dist, relPath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

// Change à chaque modification du CSS ou du JS : force le navigateur à recharger.
const version = crypto.createHash('sha1')
  .update(fs.readFileSync(path.join(src, 'css', 'style.css')))
  .update(fs.readFileSync(path.join(src, 'js', 'main.js')))
  .digest('hex')
  .slice(0, 8);

function render(route, content) {
  const canonicalPath = route.canonical !== undefined ? route.canonical : route.path;
  const source = route.canonical !== undefined
    ? (routes.find(r => r.path === route.canonical) || home)
    : route;
  const title = route.title || source.title || home.title;
  const description = route.description || source.description || home.description;
  const canonical = urlFor(canonicalPath);

  const meta = [
    `<meta name="description" content="${escapeHtml(description)}">`,
    `<meta name="robots" content="${route.noindex ? 'noindex, follow' : 'index, follow'}">`,
    route.noindex && route.path === undefined ? '' : `<link rel="canonical" href="${escapeHtml(canonical)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:locale" content="fr_FR">`,
    `<meta property="og:site_name" content="Institut Anna'Belle Colmar">`,
    `<meta property="og:title" content="${escapeHtml(title)}">`,
    `<meta property="og:description" content="${escapeHtml(description)}">`,
    `<meta property="og:url" content="${escapeHtml(canonical)}">`,
    `<meta property="og:image" content="${baseUrl}/assets/images/logo/logo.png">`,
    `<meta property="og:image:width" content="1638">`,
    `<meta property="og:image:height" content="552">`,
    `<meta name="twitter:card" content="summary_large_image">`
  ].filter(Boolean).join('\n  ');

  const values = {
    title: escapeHtml(title),
    meta: meta,
    content: content.trim(),
    year: String(new Date().getFullYear()),
    version: version
  };
  return layout.replace(/\{\{(\w+)\}\}/g, (m, key) => (key in values ? values[key] : m));
}

// 1. Dossier de sortie propre + fichiers statiques.
if (fs.existsSync(dist)) {
  (fs.rmSync || fs.rmdirSync)(dist, { recursive: true });
}
copyDir(path.join(src, 'assets'), path.join(dist, 'assets'));
copyDir(path.join(src, 'css'), path.join(dist, 'css'));
copyDir(path.join(src, 'js'), path.join(dist, 'js'));
fs.copyFileSync(path.join(src, 'favicon.ico'), path.join(dist, 'favicon.ico'));
fs.copyFileSync(path.join(src, 'CNAME'), path.join(dist, 'CNAME'));
write('.nojekyll', '');

// 2. Une page HTML par route.
for (const route of routes) {
  const page = route.page || (route.canonical !== undefined ? (route.canonical || 'home') : (route.path || 'home'));
  write(route.path ? route.path + '.html' : 'index.html', render(route, renderContent(page)));
}

// 3. Page 404 (servie par GitHub Pages pour toute URL inconnue).
write('404.html', render(
  { noindex: true, title: "Page introuvable | Institut Anna'Belle Colmar", description: home.description },
  `<section class="prestations">
    <h1>PAGE INTROUVABLE</h1>
    <p>La page demandée n'existe pas ou a été déplacée.</p>
    <a class="btn" href="/">Retour à l'accueil</a>
</section>`
));

// 4. sitemap.xml et robots.txt
const urls = routes
  .filter(r => r.sitemap !== false && !r.noindex && r.canonical === undefined)
  .map(r => [
    '  <url>',
    `    <loc>${escapeHtml(urlFor(r.path))}</loc>`,
    `    <changefreq>${r.changefreq || 'yearly'}</changefreq>`,
    `    <priority>${r.priority || '0.5'}</priority>`,
    '  </url>'
  ].join('\n'));
write('sitemap.xml',
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.join('\n') + '\n</urlset>\n');
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`);

console.log(`build: ${routes.length} pages, 404.html, sitemap.xml (${urls.length} URLs), robots.txt -> ${path.relative(root, dist)}/`);
