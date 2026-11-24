/*
 * Minimal static server that mimics GitHub Pages, to check a build locally:
 *   /foo -> foo, foo.html, foo/index.html, otherwise 404.html with HTTP 404.
 * Usage: node scripts/serve-dist.js [port] [distDir]   (default: 8765 dist)
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const port = Number(process.argv[2]) || 8765;
const root = path.resolve(__dirname, '..', process.argv[3] || 'dist');
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.css': 'text/css',
  '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf'
};

function isFile(p) {
  try { return fs.statSync(p).isFile(); } catch (e) { return false; }
}

http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  const base = path.join(root, path.normalize(urlPath).replace(/^([\/]\.\.)+/, ''));
  const candidates = [base, base + '.html', path.join(base, 'index.html')];
  let file = candidates.find(isFile);
  let status = 200;
  if (!file) {
    file = path.join(root, '404.html');
    status = 404;
  }
  res.writeHead(status, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}).listen(port, () => console.log(`Serving ${root} on http://localhost:${port}`));
