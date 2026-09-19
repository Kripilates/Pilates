// The Pages build replaces this marker with the current deployment ID.
const DEPLOYMENT_ID = '__MOOVKA_DEPLOYMENT_ID__';
const ASSET_VERSION = DEPLOYMENT_ID.startsWith('__') ? 'local-dev' : DEPLOYMENT_ID;
const CACHE_PREFIX = 'moovka-pwa-pilates-';
const SHELL_CACHE = `${CACHE_PREFIX}shell-${DEPLOYMENT_ID}`;
const IMAGE_CACHE = `${CACHE_PREFIX}images-${DEPLOYMENT_ID}`;
const APP_ROOT = new URL('./', self.registration.scope);
const APP_PATH = APP_ROOT.pathname;

const shellUrl = path => new URL(path, APP_ROOT).toString();
const SHELL_URLS = [
  './',
  'index.html',
  `style.css?v=${ASSET_VERSION}`,
  `data.js?v=${ASSET_VERSION}`,
  `app.js?v=${ASSET_VERSION}`,
  `manifest.json?v=${ASSET_VERSION}`,
  `assets/icons/icon-192.png?v=${ASSET_VERSION}`,
  `assets/icons/icon-512.png?v=${ASSET_VERSION}`,
  `assets/icons/icon-maskable-192.png?v=${ASSET_VERSION}`,
  `assets/icons/icon-maskable-512.png?v=${ASSET_VERSION}`,
  `assets/icons/apple-touch-icon.png?v=${ASSET_VERSION}`,
  'Pilates%20Assets/01_Master_Reference/MooVka_logo_FINAL.svg',
  '00_CHATGPT_START/MASTER/02_REFERENCES/BRAND/MooVka_M_FINAL.svg'
].map(shellUrl);

const shellPaths = new Set(SHELL_URLS.map(url => new URL(url).pathname));

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(SHELL_CACHE);
    await Promise.all(SHELL_URLS.map(async url => {
      const response = await fetch(url, { cache: 'reload' });
      if (!response.ok) throw new Error(`PWA shell request failed: ${url}`);
      await cache.put(url, response);
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name =>
      (name.startsWith(CACHE_PREFIX) && name !== SHELL_CACHE && name !== IMAGE_CACHE) ||
      /^(PB40|pilates)/i.test(name)
    ).map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(APP_PATH)) return;

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(request, { cache: 'no-cache' });
        if (response.ok) {
          const cache = await caches.open(SHELL_CACHE);
          try { await cache.put(request, response.clone()); } catch (_) { /* Network response stays usable. */ }
        }
        return response;
      } catch (error) {
        const cache = await caches.open(SHELL_CACHE);
        return (await cache.match(request)) || (await cache.match(shellUrl('index.html'))) || Response.error();
      }
    })());
    return;
  }

  if (shellPaths.has(url.pathname)) {
    event.respondWith((async () => {
      const cache = await caches.open(SHELL_CACHE);
      const cached = await cache.match(request);
      if (cached) return cached;
      const response = await fetch(request);
      if (response.ok) {
        try { await cache.put(request, response.clone()); } catch (_) { /* Network response stays usable. */ }
      }
      return response;
    })());
    return;
  }

  if (request.destination === 'image') {
    event.respondWith((async () => {
      const cache = await caches.open(IMAGE_CACHE);
      const cached = await cache.match(request);
      if (cached) return cached;
      const response = await fetch(request);
      if (response.ok) {
        try { await cache.put(request, response.clone()); } catch (_) { /* Network response stays usable. */ }
      }
      return response;
    })());
  }
});
