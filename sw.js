const CACHE='PB40-v44-image-cache';
const ASSETS=['./','index.html','manifest.json','style.css?v=44','app.js?v=44','data.js?v=44'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const isAppShell = req.destination === 'document' || req.destination === 'script' || req.destination === 'style' || url.pathname.endsWith('/manifest.json');

  // HTML, JS a CSS vždy nejdřív z internetu, aby GitHub Pages ukázal novou verzi hned po nahrání.
  if (isAppShell || url.searchParams.has('v')) {
    event.respondWith(
      fetch(req, { cache: 'no-store' })
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(cache => cache.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then(cached => cached || caches.match('index.html')))
    );
    return;
  }

  // Obrázky mohou zůstat v cache, ale změna ?v=44 v data.js je donutí načíst novou variantu.
  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(cache => cache.put(req, copy));
      return res;
    }))
  );
});
