// v46 self-destruct service worker. Keeps updates from being trapped in old PWA cache.
const CACHE = 'PB40-v46-no-sw-cache';
self.addEventListener('install', event => {
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(key => caches.delete(key))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll())
      .then(clients => clients.forEach(client => client.navigate(client.url)))
  );
});
self.addEventListener('fetch', event => {
  // no cache; always let the browser/network handle requests
});
